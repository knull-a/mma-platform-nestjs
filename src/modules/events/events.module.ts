import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './domain/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [],
  exports: [TypeOrmModule],
})
export class EventsModule {}
