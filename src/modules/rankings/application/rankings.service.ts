import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranking } from '../domain/ranking.entity';
import { Fight } from '../../fights/domain/fight.entity';
import { FightResult } from '../../fights/domain/fight-result.enum';
import { WeightClass } from '../../../common/weight-class.enum';

@Injectable()
export class RankingsService {
  constructor(
    @InjectRepository(Ranking)
    private readonly rankingsRepository: Repository<Ranking>,
  ) {}

  async findAll(): Promise<Ranking[]> {
    return await this.rankingsRepository.find({
      relations: ['fighter'],
      order: { weightClass: 'ASC', position: 'ASC' },
    });
  }

  async findByWeightClass(weightClass: WeightClass): Promise<Ranking[]> {
    return await this.rankingsRepository.find({
      where: { weightClass },
      relations: ['fighter'],
      order: { position: 'ASC' },
    });
  }

  async findByFighterAndWeightClass(
    fighterId: string,
    weightClass: WeightClass,
  ): Promise<Ranking | null> {
    return await this.rankingsRepository.findOne({
      where: { fighter: { id: fighterId }, weightClass },
      relations: ['fighter'],
    });
  }

  async updateRankingsAfterFight(fight: Fight): Promise<void> {
    if (!fight.isCompleted || !fight.winner) {
      return;
    }

    const { weightClass } = fight;
    const winner = fight.winner;
    const loser =
      fight.fighter1.id === winner.id ? fight.fighter2 : fight.fighter1;

    if (!fight.result) {
      throw new Error('Fight result is not available');
    }

    // Calculate points based on fight result
    const points = this.calculatePoints(fight.result);

    // Update or create rankings for both fighters
    await this.updateFighterRanking(winner, weightClass, points);
    await this.updateFighterRanking(loser, weightClass, 0);

    // Recalculate all positions in the weight class
    await this.recalculatePositions(weightClass);
  }

  private calculatePoints(result: FightResult): number {
    switch (result) {
      case FightResult.KNOCKOUT:
      case FightResult.SUBMISSION:
        return 4;
      case FightResult.DECISION:
        return 3;
      case FightResult.DRAW:
        return 1;
      default:
        return 0;
    }
  }

  private async updateFighterRanking(
    fighter: any,
    weightClass: WeightClass,
    points: number,
  ): Promise<void> {
    let ranking = await this.findByFighterAndWeightClass(
      fighter.id,
      weightClass,
    );

    if (!ranking) {
      ranking = this.rankingsRepository.create({
        fighter,
        weightClass,
        points,
        position: 0,
      });
    } else {
      ranking.points += points;
    }

    await this.rankingsRepository.save(ranking);
  }

  private async recalculatePositions(weightClass: WeightClass): Promise<void> {
    const rankings = await this.findByWeightClass(weightClass);

    // Sort by points in descending order
    rankings.sort((a, b) => b.points - a.points);

    // Update positions
    for (let i = 0; i < rankings.length; i++) {
      rankings[i].position = i + 1;
      await this.rankingsRepository.save(rankings[i]);
    }
  }
}
