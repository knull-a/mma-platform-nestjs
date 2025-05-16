import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fight } from './domain/fight.entity';
import { FightersModule } from '../fighters/fighters.module';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Fight]), FightersModule, EventsModule],
  providers: [],
  exports: [TypeOrmModule],
})
export class FightsModule {}
