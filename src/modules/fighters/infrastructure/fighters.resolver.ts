import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from '../domain/fighter.entity';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';
import { NotFoundException } from '@nestjs/common';
import { Fight } from '../../fights/domain/fight.entity';
import { FighterStats } from './dto/fighter-stats.output';
import { WeightClass } from '../../../common/weight-class.enum';

@Resolver(() => Fighter)
export class FightersResolver {
  constructor(
    @InjectRepository(Fighter)
    private fighterRepository: Repository<Fighter>,
    @InjectRepository(Fight)
    private fightRepository: Repository<Fight>,
  ) {}

  @Query(() => [Fighter])
  async fighters(): Promise<Fighter[]> {
    return this.fighterRepository.find();
  }

  @Query(() => Fighter)
  async fighter(@Args('id', { type: () => ID }) id: string): Promise<Fighter> {
    return this.fighterRepository.findOneOrFail({ where: { id } });
  }

  @Mutation(() => Fighter)
  async createFighter(
    @Args('input') input: CreateFighterInput,
  ): Promise<Fighter> {
    const fighter = this.fighterRepository.create(input);
    return this.fighterRepository.save(fighter);
  }

  @Mutation(() => Fighter)
  async updateFighter(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateFighterInput,
  ): Promise<Fighter> {
    await this.fighterRepository.update(id, input);
    return this.fighterRepository.findOneOrFail({ where: { id } });
  }

  @Mutation(() => Boolean)
  async deleteFighter(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    const result = await this.fighterRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException('Fighter not found');
    }
    return result.affected > 0;
  }

  @Query(() => FighterStats)
  async fighterStats(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<FighterStats> {
    const fighter = await this.fighterRepository.findOneOrFail({
      where: { id },
    });
    return {
      id: fighter.id,
      firstName: fighter.firstName,
      lastName: fighter.lastName,
      nickname: fighter.nickname,
      weightClass: fighter.weightClass,
      wins: fighter.wins,
      losses: fighter.losses,
      draws: fighter.draws,
      knockouts: fighter.knockouts,
      submissions: fighter.submissions,
      winPercentage: this.calculateWinPercentage(fighter),
      currentRanking: fighter.currentRanking,
    };
  }

  @Query(() => [Fight])
  async fighterHistory(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Fight[]> {
    const fights = await this.fightRepository.find({
      where: [{ fighter1: { id } }, { fighter2: { id } }],
      relations: ['fighter1', 'fighter2', 'event', 'winner'],
      order: { event: { date: 'DESC' } },
    });

    return fights;
  }

  @Query(() => [Fighter])
  async fightersByWeightClass(
    @Args('weightClass', { type: () => WeightClass }) weightClass: WeightClass,
  ): Promise<Fighter[]> {
    return this.fighterRepository.find({
      where: { weightClass },
      order: { currentRanking: 'ASC' },
    });
  }

  private calculateWinPercentage(fighter: Fighter): number {
    const totalFights = fighter.wins + fighter.losses + fighter.draws;
    if (totalFights === 0) return 0;
    return Math.round((fighter.wins / totalFights) * 100);
  }
}
