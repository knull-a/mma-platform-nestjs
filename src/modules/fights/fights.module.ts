import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fight } from './domain/fight.entity';
import { FightsResolver } from './infrastructure/fights.resolver';
import { FightsService } from './application/fights.service';
import { RankingsModule } from '../rankings/rankings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fight]),
    RankingsModule,
  ],
  providers: [FightsResolver, FightsService],
  exports: [FightsService],
})
export class FightsModule {}
