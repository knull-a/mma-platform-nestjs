import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from './domain/fighter.entity';
import { FightersResolver } from './infrastructure/fighters.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter])],
  providers: [FightersResolver],
  exports: [TypeOrmModule],
})
export class FightersModule {}
