import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './domain/event.entity';
import { EventsResolver } from './infrastructure/events.resolver';
import { EventsService } from './application/events.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventsResolver, EventsService],
  exports: [EventsService],
})
export class EventsModule {}
