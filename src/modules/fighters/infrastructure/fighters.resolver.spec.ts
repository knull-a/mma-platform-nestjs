import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { FightersResolver } from './fighters.resolver';
import { Fighter } from '../domain/fighter.entity';
import { Fight } from '../../fights/domain/fight.entity';
import { NotFoundException } from '@nestjs/common';
import { WeightClass } from '../../../common/weight-class.enum';
import { CreateFighterInput } from '../application/dto/create-fighter.input';

// Mock data
const mockFighter = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  nickname: 'The Destroyer',
  dateOfBirth: new Date('1990-01-01'),
  nationality: 'USA',
  wins: 10,
  losses: 2,
  draws: 1,
  knockouts: 5,
  submissions: 3,
  weightClass: 'LIGHTWEIGHT',
  currentRanking: 3,
};

const mockFighters = [
  mockFighter,
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    nickname: 'The Machine',
    dateOfBirth: new Date('1992-05-15'),
    nationality: 'Canada',
    wins: 8,
    losses: 1,
    draws: 0,
    knockouts: 3,
    submissions: 5,
    weightClass: 'LIGHTWEIGHT',
    currentRanking: 5,
  },
];

describe('FightersResolver', () => {
  let resolver: FightersResolver;
  let fighterRepository: Repository<Fighter>;
  // Using fightRepository in the test setup but not in the tests
  let fightRepository: Repository<Fight>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FightersResolver,
        {
          provide: getRepositoryToken(Fighter),
          useValue: {
            find: jest.fn().mockResolvedValue(mockFighters),
            findOneOrFail: jest.fn().mockResolvedValue(mockFighter),
            create: jest.fn().mockReturnValue(mockFighter),
            save: jest.fn().mockResolvedValue(mockFighter),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
        {
          provide: getRepositoryToken(Fight),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    resolver = module.get<FightersResolver>(FightersResolver);
    fighterRepository = module.get<Repository<Fighter>>(
      getRepositoryToken(Fighter),
    );
    fightRepository = module.get<Repository<Fight>>(getRepositoryToken(Fight));
  });

  it('should be defined', (): void => {
    expect(resolver).toBeDefined();
  });

  describe('fighters', () => {
    it('should return an array of fighters', async (): Promise<void> => {
      const result = await resolver.fighters();
      expect(result).toEqual(mockFighters);
      expect(fighterRepository.find).toHaveBeenCalled();
    });
  });

  describe('fighter', () => {
    it('should return a single fighter', async (): Promise<void> => {
      const result = await resolver.fighter('1');
      expect(result).toEqual(mockFighter);
      expect(fighterRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('createFighter', () => {
    it('should create a new fighter', async (): Promise<void> => {
      const createFighterInput: CreateFighterInput = {
        firstName: 'John',
        lastName: 'Doe',
        nickname: 'The Destroyer',
        dateOfBirth: '1990-01-01',
        nationality: 'USA',
        weightClass: WeightClass.LIGHTWEIGHT,
      };
      const result = await resolver.createFighter(createFighterInput);
      expect(result).toEqual(mockFighter);
      expect(fighterRepository.create).toHaveBeenCalledWith(createFighterInput);
      expect(fighterRepository.save).toHaveBeenCalled();
    });
  });

  describe('updateFighter', () => {
    it('should update a fighter', async (): Promise<void> => {
      const updateFighterInput = {
        firstName: 'John',
        lastName: 'Smith',
      };
      const result = await resolver.updateFighter('1', updateFighterInput);
      expect(result).toEqual(mockFighter);
      expect(fighterRepository.update).toHaveBeenCalledWith(
        '1',
        updateFighterInput,
      );
      expect(fighterRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('deleteFighter', () => {
    it('should delete a fighter and return true', async (): Promise<void> => {
      const result = await resolver.deleteFighter('1');
      expect(result).toBe(true);
      expect(fighterRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if fighter not found', async (): Promise<void> => {
      jest
        .spyOn(fighterRepository, 'delete')
        .mockResolvedValueOnce({ affected: 0, raw: {} } as DeleteResult);
      await expect(resolver.deleteFighter('999')).rejects.toThrow(
        NotFoundException,
      );
      expect(fighterRepository.delete).toHaveBeenCalledWith('999');
    });
  });

  describe('fighterStats', () => {
    it('should return fighter statistics', async (): Promise<void> => {
      const result = await resolver.fighterStats('1');
      expect(result).toHaveProperty('winPercentage');
      expect(fighterRepository.findOneOrFail).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
});
