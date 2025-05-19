import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ScheduleModule } from '@nestjs/schedule';
import databaseConfig from './config/database.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { FightersModule } from './modules/fighters/fighters.module';
import { EventsModule } from './modules/events/events.module';
import { FightsModule } from './modules/fights/fights.module';
import { RankingsModule } from './modules/rankings/rankings.module';
import { DateScalar } from './common/scalars/date.scalar';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('database') as TypeOrmModuleOptions;
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      introspection: true,
    }),
    ScheduleModule.forRoot(),
    FightersModule,
    EventsModule,
    FightsModule,
    RankingsModule,
  ],
  providers: [DateScalar],
})
export class AppModule {}
