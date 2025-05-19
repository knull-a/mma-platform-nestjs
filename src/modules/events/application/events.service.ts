import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../domain/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

  async create(createEventInput: CreateEventInput): Promise<Event> {
    const event = this.eventsRepository.create(createEventInput);
    return await this.eventsRepository.save(event);
  }

  async findAll(): Promise<Event[]> {
    return await this.eventsRepository.find();
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async findUpcoming(): Promise<Event[]> {
    const now = new Date();
    return await this.eventsRepository
      .createQueryBuilder('event')
      .where('event.date > :now', { now })
      .orderBy('event.date', 'ASC')
      .getMany();
  }

  async update(id: string, updateEventInput: UpdateEventInput): Promise<Event> {
    const event = await this.findOne(id);
    Object.assign(event, updateEventInput);
    return await this.eventsRepository.save(event);
  }

  async remove(id: string): Promise<Event> {
    const event = await this.findOne(id);
    return await this.eventsRepository.remove(event);
  }
} 