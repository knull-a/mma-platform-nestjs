import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Fight } from '../domain/fight.entity';
import { FightsService } from '../application/fights.service';
import { CreateFightInput } from '../application/dto/create-fight.input';
import { UpdateFightInput } from '../application/dto/update-fight.input';
import { FightResult } from '../domain/fight-result.enum';

@Resolver(() => Fight)
export class FightsResolver {
  constructor(private readonly fightsService: FightsService) {}

  @Query(() => [Fight])
  async fights(): Promise<Fight[]> {
    return await this.fightsService.findAll();
  }

  @Query(() => Fight)
  async fight(@Args('id') id: string): Promise<Fight> {
    return await this.fightsService.findOne(id);
  }

  @Query(() => [Fight])
  async fightsByEvent(@Args('eventId') eventId: string): Promise<Fight[]> {
    return await this.fightsService.findByEvent(eventId);
  }

  @Mutation(() => Fight)
  async createFight(
    @Args('createFightInput') createFightInput: CreateFightInput,
  ): Promise<Fight> {
    return await this.fightsService.create(createFightInput);
  }

  @Mutation(() => Fight)
  async updateFight(
    @Args('id') id: string,
    @Args('updateFightInput') updateFightInput: UpdateFightInput,
  ): Promise<Fight> {
    return await this.fightsService.update(id, updateFightInput);
  }

  @Mutation(() => Fight)
  async recordFightResult(
    @Args('id') id: string,
    @Args('result') result: FightResult,
    @Args('winnerId') winnerId: string,
  ): Promise<Fight> {
    return await this.fightsService.recordResult(id, result, winnerId);
  }

  @Mutation(() => Boolean)
  async removeFight(@Args('id') id: string): Promise<boolean> {
    await this.fightsService.remove(id);
    return true;
  }
} 