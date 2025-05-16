import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranking } from './domain/ranking.entity';
import { FightersModule } from '../fighters/fighters.module';
import { Fight } from '../fights/domain/fight.entity';
import { RankingService } from './application/ranking.service';
import { RankingProcessorScheduler } from './infrastructure/ranking-processor.scheduler';
import { Fighter } from '../fighters/domain/fighter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ranking, Fight, Fighter]),
    FightersModule,
  ],
  providers: [RankingService, RankingProcessorScheduler],
  exports: [TypeOrmModule, RankingService],
})
export class RankingsModule {}
