# MMA Platform API

## Description

This is a NestJS-based API for managing MMA fighters, events, fights, and rankings. The application follows Clean Architecture principles and provides a GraphQL API.

## Features

- Fighter management (profiles, statistics)
- Event scheduling
- Fight results tracking
- Automated ranking calculations
- Background processing for ranking updates

## Tech Stack

- NestJS (v11)
- TypeORM
- PostgreSQL
- GraphQL
- Apollo Server

## Installation

1. Clone the repository:
```
git clone <repository-url>
cd mma-platform-nestjs
```

2. Install dependencies:
```
pnpm install
```

3. Configure the database:
   - Create a PostgreSQL database
   - Configure your `.env` file based on the `.env.example`

4. Run the database migration:
```
# For a new database
psql -U <username> -d <database> -f database/migrations/initial-schema.sql
```

## Running the app

```bash
# development
pnpm start:dev

# production mode
pnpm start:prod
```

## Test

```bash
# unit tests
pnpm test

# e2e tests
pnpm test:e2e
```

## Project Structure

The project follows the Clean Architecture principles:

```
src/
├── common/             # Shared utilities and base classes
├── config/             # Application configuration
├── modules/            # Feature modules
│   ├── fighters/       # Fighter domain
│   │   ├── domain/     # Entities
│   │   ├── application/# Use cases and application services
│   │   └── infrastructure/ # Controllers, resolvers, repositories
│   ├── events/         # Event domain
│   ├── fights/         # Fight domain
│   └── rankings/       # Ranking domain
└── main.ts             # Application entry point
```

## GraphQL API

After starting the application, you can access the GraphQL Playground at:
```
http://localhost:3000/graphql
``` 