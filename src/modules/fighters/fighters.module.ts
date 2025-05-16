import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from './domain/fighter.entity';
import { FightersResolver } from './infrastructure/fighters.resolver';
import { FightersController } from './infrastructure/fighters.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter])],
  controllers: [FightersController],
  providers: [FightersResolver],
  exports: [TypeOrmModule],
})
export class FightersModule {}
