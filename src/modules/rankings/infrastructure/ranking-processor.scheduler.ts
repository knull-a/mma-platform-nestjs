import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Fight } from '../../fights/domain/fight.entity';
import { RankingService } from '../application/ranking.service';

@Injectable()
export class RankingProcessorScheduler {
  private readonly logger = new Logger(RankingProcessorScheduler.name);

  constructor(
    @InjectRepository(Fight)
    private fightRepository: Repository<Fight>,
    private rankingService: RankingService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async processRankingUpdates() {
    this.logger.log('Processing ranking updates for completed fights...');

    // Find all completed fights that haven't had rankings updated
    const fights = await this.fightRepository.find({
      where: {
        isCompleted: true,
        isRankingUpdated: false,
      },
      relations: ['fighter1', 'fighter2', 'winner'],
    });

    this.logger.log(`Found ${fights.length} fights to process`);

    // Process each fight
    for (const fight of fights) {
      try {
        await this.rankingService.processRankingForFight(fight);
        this.logger.log(`Processed ranking for fight: ${fight.id}`);
      } catch (error) {
        this.logger.error(
          `Error processing ranking for fight ${fight.id}:`,
          error.stack,
        );
      }
    }

    this.logger.log('Completed ranking updates processing');
  }
}
