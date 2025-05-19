import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Event } from '../domain/event.entity';
import { EventsService } from '../application/events.service';
import { CreateEventInput } from '../application/dto/create-event.input';
import { UpdateEventInput } from '../application/dto/update-event.input';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

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