import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from './domain/fighter.entity';
import { FightersResolver } from './infrastructure/fighters.resolver';
import { Fight } from '../fights/domain/fight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter, Fight])],
  providers: [FightersResolver],
  exports: [TypeOrmModule],
})
export class FightersModule {}
