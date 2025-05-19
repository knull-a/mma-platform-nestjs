import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fight } from '../domain/fight.entity';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';
import { FightResult } from '../domain/fight-result.enum';
import { RankingsService } from '../../rankings/application/rankings.service';

@Injectable()
export class FightsService {
  constructor(
    @InjectRepository(Fight)
    private readonly fightsRepository: Repository<Fight>,
    private readonly rankingsService: RankingsService,
  ) {}

  async create(createFightInput: CreateFightInput): Promise<Fight> {
    // Create a new fight entity with the proper structure
    const fight = this.fightsRepository.create({
      fighter1: { id: createFightInput.fighter1Id },
      fighter2: { id: createFightInput.fighter2Id },
      event: { id: createFightInput.eventId },
      weightClass: createFightInput.weightClass,
      rounds: createFightInput.rounds,
      isCompleted: false,
      isRankingUpdated: false,
    });

    // Save the fight
    const savedFight = await this.fightsRepository.save(fight);

    // Reload the fight with all relations to ensure we have complete data
    const loadedFight = await this.fightsRepository.findOne({
      where: { id: savedFight.id },
      relations: ['fighter1', 'fighter2', 'event', 'winner'],
    });

    if (!loadedFight) {
      throw new NotFoundException(
        `Fight with ID ${savedFight.id} not found after creation`,
      );
    }

    return loadedFight;
  }

  async findAll(): Promise<Fight[]> {
    return await this.fightsRepository.find({
      relations: ['fighter1', 'fighter2', 'event', 'winner'],
    });
  }

  async findOne(id: string): Promise<Fight> {
    const fight = await this.fightsRepository.findOne({
      where: { id },
      relations: ['fighter1', 'fighter2', 'event', 'winner'],
    });
    if (!fight) {
      throw new NotFoundException(`Fight with ID ${id} not found`);
    }
    return fight;
  }

  async findByEvent(eventId: string): Promise<Fight[]> {
    return await this.fightsRepository.find({
      where: { event: { id: eventId } },
      relations: ['fighter1', 'fighter2', 'event', 'winner'],
    });
  }

  async update(id: string, updateFightInput: UpdateFightInput): Promise<Fight> {
    const fight = await this.findOne(id);
    Object.assign(fight, updateFightInput);
    return await this.fightsRepository.save(fight);
  }

  async recordResult(
    id: string,
    result: FightResult,
    winnerId: string,
  ): Promise<Fight> {
    const fight = await this.findOne(id);

    if (fight.isCompleted) {
      throw new BadRequestException('Fight result has already been recorded');
    }

    if (fight.fighter1.id !== winnerId && fight.fighter2.id !== winnerId) {
      throw new BadRequestException(
        'Winner must be one of the fighters in the match',
      );
    }

    const winner =
      fight.fighter1.id === winnerId ? fight.fighter1 : fight.fighter2;
    const loser =
      fight.fighter1.id === winnerId ? fight.fighter2 : fight.fighter1;

    fight.result = result;
    fight.winner = winner;
    fight.isCompleted = true;

    const savedFight = await this.fightsRepository.save(fight);

    // Update rankings in the background
    await this.rankingsService.updateRankingsAfterFight(savedFight);

    return savedFight;
  }

  async remove(id: string): Promise<Fight> {
    const fight = await this.findOne(id);
    return await this.fightsRepository.remove(fight);
  }
}
