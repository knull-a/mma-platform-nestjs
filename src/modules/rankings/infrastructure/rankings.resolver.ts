import { Args, Query, Resolver } from '@nestjs/graphql';
import { Ranking } from '../domain/ranking.entity';
import { RankingsService } from '../application/rankings.service';
import { WeightClass } from '../../../common/weight-class.enum';

@Resolver(() => Ranking)
export class RankingsResolver {
  constructor(private readonly rankingsService: RankingsService) {}

  @Query(() => [Ranking])
  async rankings(): Promise<Ranking[]> {
    return await this.rankingsService.findAll();
  }

  @Query(() => [Ranking])
  async rankingsByWeightClass(
    @Args('weightClass') weightClass: WeightClass,
  ): Promise<Ranking[]> {
    return await this.rankingsService.findByWeightClass(weightClass);
  }

  @Query(() => Ranking, { nullable: true })
  async fighterRanking(
    @Args('fighterId') fighterId: string,
    @Args('weightClass') weightClass: WeightClass,
  ): Promise<Ranking | null> {
    return await this.rankingsService.findByFighterAndWeightClass(fighterId, weightClass);
  }
} 