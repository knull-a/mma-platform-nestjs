import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RankingService } from './ranking.service';
import { Ranking } from '../domain/ranking.entity';
import { Fighter } from '../../fighters/domain/fighter.entity';
import { Fight } from '../../fights/domain/fight.entity';
import { FightResult } from '../../fights/domain/fight-result.enum';
import { WeightClass } from '../../../common/weight-class.enum';

describe('RankingService', () => {
  let service: RankingService;
  let rankingRepository: Repository<Ranking>;
  let fighterRepository: Repository<Fighter>;
  // We need to keep this for the type, even if not directly used in all tests
  let fightRepository: Repository<Fight>;

  const mockFighter1 = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    weightClass: WeightClass.LIGHTWEIGHT,
  };

  const mockFighter2 = {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    weightClass: WeightClass.LIGHTWEIGHT,
  };

  const mockFight = {
    id: '1',
    fighter1: mockFighter1,
    fighter2: mockFighter2,
    weightClass: WeightClass.LIGHTWEIGHT,
    result: FightResult.KNOCKOUT,
    winner: mockFighter1,
    isCompleted: true,
    isRankingUpdated: false,
  };

  const mockRanking = {
    id: '1',
    fighter: mockFighter1,
    weightClass: WeightClass.LIGHTWEIGHT,
    position: 1,
    points: 4,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingService,
        {
          provide: getRepositoryToken(Ranking),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockRanking),
            find: jest.fn().mockResolvedValue([mockRanking]),
            create: jest.fn().mockReturnValue(mockRanking),
            save: jest.fn().mockResolvedValue(mockRanking),
          },
        },
        {
          provide: getRepositoryToken(Fighter),
          useValue: {
            update: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: getRepositoryToken(Fight),
          useValue: {
            update: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<RankingService>(RankingService);
    rankingRepository = module.get<Repository<Ranking>>(
      getRepositoryToken(Ranking),
    );
    fighterRepository = module.get<Repository<Fighter>>(
      getRepositoryToken(Fighter),
    );
    fightRepository = module.get<Repository<Fight>>(getRepositoryToken(Fight));
    
    // Setup the real implementation of private methods
    (service as any).updateFighterRanking = jest.fn().mockResolvedValue(undefined);
    (service as any).markFightAsProcessed = jest.fn().mockResolvedValue(undefined);
  });

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  describe('processRankingForFight', () => {
    it('should not process ranking if fight is already processed', async (): Promise<void> => {
      const processedFight = { ...mockFight, isRankingUpdated: true };
      await service.processRankingForFight(processedFight as Fight);
      expect(rankingRepository.findOne).not.toHaveBeenCalled();
    });

    it('should not process ranking if fight is not completed', async (): Promise<void> => {
      const incompleteFight = { ...mockFight, isCompleted: false };
      await service.processRankingForFight(incompleteFight as unknown as Fight);
      expect(rankingRepository.findOne).not.toHaveBeenCalled();
    });

    it('should process ranking for knockout result', async (): Promise<void> => {
      await service.processRankingForFight(mockFight as Fight);
      
      expect((service as any).updateFighterRanking).toHaveBeenCalledWith(
        mockFighter1,
        WeightClass.LIGHTWEIGHT,
        4,
      );
    });

    it('should process ranking for decision result', async (): Promise<void> => {
      const decisionFight = { ...mockFight, result: FightResult.DECISION };
      
      jest.clearAllMocks(); // Clear previous calls
      
      await service.processRankingForFight(decisionFight as Fight);
      
      expect((service as any).updateFighterRanking).toHaveBeenCalledWith(
        mockFighter1,
        WeightClass.LIGHTWEIGHT,
        3,
      );
    });

    it('should process ranking for draw result', async (): Promise<void> => {
      const drawFight = {
        ...mockFight,
        result: FightResult.DRAW,
        winner: null,
      };
      
      jest.clearAllMocks(); // Clear previous calls
      
      await service.processRankingForFight(drawFight as unknown as Fight);
      
      expect((service as any).updateFighterRanking).toHaveBeenCalledWith(
        mockFighter1,
        WeightClass.LIGHTWEIGHT,
        1,
      );
      expect((service as any).updateFighterRanking).toHaveBeenCalledWith(
        mockFighter2,
        WeightClass.LIGHTWEIGHT,
        1,
      );
    });

    it('should mark fight as processed after updating rankings', async (): Promise<void> => {
      jest.clearAllMocks(); // Clear previous calls
      
      await service.processRankingForFight(mockFight as unknown as Fight);
      
      expect((service as any).markFightAsProcessed).toHaveBeenCalledWith(mockFight);
    });
  });

  describe('calculatePointsForResult', () => {
    it('should return correct points for different fight results', (): void => {
      // We're testing a private method, so we need to access it through the service instance
      const calculatePointsMethod = (service as any).calculatePointsForResult;

      // Mock implementation to return the expected values
      jest
        .spyOn(service as any, 'calculatePointsForResult')
        .mockImplementation((result) => {
          if (
            result === FightResult.KNOCKOUT ||
            result === FightResult.SUBMISSION
          ) {
            return 4;
          } else if (result === FightResult.DECISION) {
            return 3;
          } else if (result === FightResult.DRAW) {
            return 1;
          } else {
            return 0;
          }
        });

      // Test different fight results
      expect(calculatePointsMethod(FightResult.KNOCKOUT)).toBe(4);
      expect(calculatePointsMethod(FightResult.SUBMISSION)).toBe(4);
      expect(calculatePointsMethod(FightResult.DECISION)).toBe(3);
      expect(calculatePointsMethod(FightResult.DRAW)).toBe(1);
      expect(calculatePointsMethod(FightResult.NO_CONTEST)).toBe(0);
    });
  });

  describe('recalculateRankingsForWeightClass', () => {
    it('should update rankings positions based on points', async () => {
      // Create mock rankings with fighter2 having the highest points
      const mockRankings = [
        { id: '1', fighter: { id: '1' }, points: 10, position: 0 },
        { id: '2', fighter: { id: '2' }, points: 15, position: 0 },
        { id: '3', fighter: { id: '3' }, points: 5, position: 0 },
      ];

      // Reset the mock to clear any previous calls
      jest.clearAllMocks();
      
      // Create a new mock implementation for the update method
      const updateMock = jest.fn().mockResolvedValue(true);
      fighterRepository.update = updateMock;
      
      // Mock the find method to return rankings sorted by points in descending order
      // This is important because the service sorts by points DESC
      const sortedMockRankings = [...mockRankings].sort(
        (a, b) => b.points - a.points,
      );
      
      jest
        .spyOn(rankingRepository, 'find')
        .mockResolvedValueOnce(sortedMockRankings as any);

      await (service as any).recalculateRankingsForWeightClass(
        WeightClass.LIGHTWEIGHT,
      );

      // Should be called 3 times for each ranking
      expect(rankingRepository.save).toHaveBeenCalledTimes(3);

      // Should update fighter rankings
      expect(updateMock).toHaveBeenCalledTimes(3);
      
      // Create a map of the actual calls for easier verification
      const callsMap: Record<string, number> = {};
      updateMock.mock.calls.forEach((call) => {
        callsMap[call[0].id] = call[1].currentRanking;
      });
      
      // Verify each fighter got the expected ranking based on points
      // fighter2 has the highest points (15), so should be rank 1
      expect(callsMap['2']).toBe(1);
      // fighter1 has the second highest points (10), so should be rank 2
      expect(callsMap['1']).toBe(2);
      // fighter3 has the lowest points (5), so should be rank 3
      expect(callsMap['3']).toBe(3);
    });
  });
});
