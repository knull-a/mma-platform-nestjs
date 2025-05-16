import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranking } from '../domain/ranking.entity';
import { Fighter } from '../../fighters/domain/fighter.entity';
import { Fight } from '../../fights/domain/fight.entity';
import { FightResult } from '../../fights/domain/fight-result.enum';
import { WeightClass } from '../../../common/weight-class.enum';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Ranking)
    private rankingRepository: Repository<Ranking>,
    @InjectRepository(Fighter)
    private fighterRepository: Repository<Fighter>,
    @InjectRepository(Fight)
    private fightRepository: Repository<Fight>,
  ) {}

  async processRankingForFight(fight: Fight): Promise<void> {
    if (fight.isRankingUpdated || !fight.isCompleted || !fight.result) {
      return;
    }

    // Get the points to award based on the fight result
    const pointsToAward = this.calculatePointsForResult(fight.result);

    // If we have a winner, update their ranking
    if (fight.winner && pointsToAward > 0) {
      await this.updateFighterRanking(
        fight.winner,
        fight.weightClass,
        pointsToAward,
      );
    }

    // In case of a draw, award points to both fighters
    if (fight.result === FightResult.DRAW) {
      await this.updateFighterRanking(
        fight.fighter1,
        fight.weightClass,
        pointsToAward,
      );
      await this.updateFighterRanking(
        fight.fighter2,
        fight.weightClass,
        pointsToAward,
      );
    }

    // Mark the fight as processed for rankings
    await this.markFightAsProcessed(fight);
  }

  private calculatePointsForResult(result: FightResult): number {
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
    fighter: Fighter,
    weightClass: WeightClass,
    points: number,
  ): Promise<void> {
    // Get or create ranking for the fighter in this weight class
    let ranking = await this.rankingRepository.findOne({
      where: { fighter: { id: fighter.id }, weightClass },
    });

    if (!ranking) {
      ranking = this.rankingRepository.create({
        fighter,
        weightClass,
        position: 0, // Will be updated later
        points: 0,
      });
    }

    // Add the points
    ranking.points += points;

    // Save the ranking
    await this.rankingRepository.save(ranking);

    // Update all rankings for this weight class
    await this.recalculateRankingsForWeightClass(weightClass);
  }

  private async recalculateRankingsForWeightClass(
    weightClass: WeightClass,
  ): Promise<void> {
    // Get all rankings for this weight class ordered by points (descending)
    const rankings = await this.rankingRepository.find({
      where: { weightClass },
      order: { points: 'DESC' },
    });

    // Assign positions based on points
    for (let i = 0; i < rankings.length; i++) {
      rankings[i].position = i + 1;
      await this.rankingRepository.save(rankings[i]);

      // Also update fighter's current ranking
      await this.fighterRepository.update(
        { id: rankings[i].fighter.id },
        { currentRanking: rankings[i].position },
      );
    }
  }

  private async markFightAsProcessed(fight: Fight): Promise<void> {
    fight.isRankingUpdated = true;
    await this.fightRepository.update(
      { id: fight.id },
      { isRankingUpdated: true },
    );
  }
}
