import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Event } from '../domain/event.entity';
import { EventsService } from '../application/events.service';
import { CreateEventInput } from '../application/dto/create-event.input';
import { UpdateEventInput } from '../application/dto/update-event.input';
import { Fight } from '../../fights/domain/fight.entity';
import { EventWithFights } from './dto/event-with-fights.output';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(() => Event)
export class EventsResolver {
  constructor(
    private readonly eventsService: EventsService,
    @InjectRepository(Fight)
    private readonly fightRepository: Repository<Fight>,
  ) {}

  @Query(() => [Event])
  async events(): Promise<Event[]> {
    return await this.eventsService.findAll();
  }

  @Query(() => Event)
  async event(@Args('id') id: string): Promise<Event> {
    return await this.eventsService.findOne(id);
  }

  @Query(() => [Event])
  async upcomingEvents(): Promise<Event[]> {
    return await this.eventsService.findUpcoming();
  }

  @Query(() => [EventWithFights])
  async upcomingEventsWithFights(): Promise<EventWithFights[]> {
    const events = await this.eventsService.findUpcoming();
    const result: EventWithFights[] = [];

    for (const event of events) {
      const fights = await this.fightRepository.find({
        where: { event: { id: event.id } },
        relations: ['fighter1', 'fighter2', 'winner'],
      });

      result.push({
        ...event,
        fights,
      });
    }

    return result;
  }

  @Query(() => EventWithFights)
  async eventWithFights(@Args('id') id: string): Promise<EventWithFights> {
    const event = await this.eventsService.findOne(id);
    const fights = await this.fightRepository.find({
      where: { event: { id: event.id } },
      relations: ['fighter1', 'fighter2', 'winner'],
    });

    return {
      ...event,
      fights,
    };
  }

  @Mutation(() => Event)
  async createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput,
  ): Promise<Event> {
    return await this.eventsService.create(createEventInput);
  }

  @Mutation(() => Event)
  async updateEvent(
    @Args('id') id: string,
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
  ): Promise<Event> {
    return await this.eventsService.update(id, updateEventInput);
  }

  @Mutation(() => Boolean)
  async removeEvent(@Args('id') id: string): Promise<boolean> {
    await this.eventsService.remove(id);
    return true;
  }
}
