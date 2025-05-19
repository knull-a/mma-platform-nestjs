import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranking } from './domain/ranking.entity';
import { RankingsResolver } from './infrastructure/rankings.resolver';
import { RankingsService } from './application/rankings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking])],
  providers: [RankingsResolver, RankingsService],
  exports: [RankingsService],
})
export class RankingsModule {}
