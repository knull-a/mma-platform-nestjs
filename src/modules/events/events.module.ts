import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './domain/event.entity';
import { EventsResolver } from './infrastructure/events.resolver';
import { EventsService } from './application/events.service';
import { Fight } from '../fights/domain/fight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Fight])],
  providers: [EventsResolver, EventsService],
  exports: [EventsService],
})
export class EventsModule {}
