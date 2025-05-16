import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from '../domain/fighter.entity';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Fighter)
export class FightersResolver {
  constructor(
    @InjectRepository(Fighter)
    private fighterRepository: Repository<Fighter>,
  ) {}

  @Query(() => [Fighter])
  async fighters(): Promise<Fighter[]> {
    return this.fighterRepository.find();
  }

  @Query(() => Fighter)
  async fighter(@Args('id', { type: () => ID }) id: string): Promise<Fighter> {
    return this.fighterRepository.findOneOrFail({ where: { id } });
  }

  @Mutation(() => Fighter)
  async createFighter(
    @Args('input') input: CreateFighterInput,
  ): Promise<Fighter> {
    const fighter = this.fighterRepository.create(input);
    return this.fighterRepository.save(fighter);
  }

  @Mutation(() => Fighter)
  async updateFighter(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateFighterInput,
  ): Promise<Fighter> {
    await this.fighterRepository.update(id, input);
    return this.fighterRepository.findOneOrFail({ where: { id } });
  }

  @Mutation(() => Boolean)
  async deleteFighter(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    const result = await this.fighterRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException('Fighter not found');
    }
    return result.affected > 0;
  }
}
