# MMA Platform Setup and Deployment Guide

This document provides instructions for setting up and deploying the MMA Platform application.

## Prerequisites

- Node.js (v14 or later)
- PostgreSQL (v12 or later)
- npm or yarn

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd mma-platform-nestjs
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=mma_platform

# Application Configuration
PORT=3000
NODE_ENV=development
```

### 4. Set Up the Database

#### Option 1: Manual Setup

Create a PostgreSQL database and run the SQL scripts:

```bash
# Create the database
createdb mma_platform

# Run the initialization scripts
psql -d mma_platform -f database/migrations/00-init-extensions.sql
psql -d mma_platform -f database/migrations/initial-schema.sql
```

#### Option 2: Using Docker

```bash
# Start PostgreSQL container
docker run --name mma-postgres -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=mma_platform -p 5432:5432 -d postgres:12

# Run the initialization scripts
docker exec -i mma-postgres psql -U postgres -d mma_platform < database/migrations/00-init-extensions.sql
docker exec -i mma-postgres psql -U postgres -d mma_platform < database/migrations/initial-schema.sql
```

### 5. Start the Development Server

```bash
npm run start:dev
# or
yarn start:dev
```

The GraphQL API will be available at `http://localhost:3000/graphql`.

## Production Deployment

### 1. Build the Application

```bash
npm run build
# or
yarn build
```

### 2. Configure Production Environment Variables

Create a `.env.production` file with production-specific settings:

```
# Database Configuration
DB_HOST=your_production_db_host
DB_PORT=5432
DB_USERNAME=your_production_db_username
DB_PASSWORD=your_production_db_password
DB_DATABASE=mma_platform

# Application Configuration
PORT=3000
NODE_ENV=production
```

### 3. Start the Production Server

```bash
NODE_ENV=production npm run start:prod
# or
NODE_ENV=production yarn start:prod
```

## Docker Deployment

### 1. Build the Docker Image

```bash
docker build -t mma-platform-api .
```

### 2. Run the Application with Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3'

services:
  api:
    image: mma-platform-api
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USERNAME=postgres
      - DB_PASSWORD=your_password
      - DB_DATABASE=mma_platform
      - NODE_ENV=production
    depends_on:
      - postgres
    restart: always

  postgres:
    image: postgres:12
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=your_password
      - POSTGRES_DB=mma_platform
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/migrations:/docker-entrypoint-initdb.d
    restart: always

volumes:
  postgres_data:
```

Start the services:

```bash
docker-compose up -d
```

## Database Migration Strategy

For production environments, we recommend using TypeORM migrations instead of `synchronize: true`:

1. Generate a migration:

```bash
npm run typeorm:migration:generate -- -n MigrationName
# or
yarn typeorm:migration:generate -n MigrationName
```

2. Run migrations:

```bash
npm run typeorm:migration:run
# or
yarn typeorm:migration:run
```

## Troubleshooting

### Database Connection Issues

- Verify that PostgreSQL is running
- Check that the database credentials in `.env` are correct
- Ensure the database exists and is accessible

### API Errors

- Check the application logs for detailed error messages
- Verify that all required environment variables are set
- Ensure that the database schema is up to date

## Monitoring and Maintenance

- Use PM2 or similar tools for process management in production
- Set up logging with tools like Winston or Pino
- Configure health checks for your deployment platform
