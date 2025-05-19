# MMA Platform GraphQL API Documentation

This document contains ready-to-use GraphQL queries and mutations for the MMA Platform API.

## Table of Contents
- [Queries](#queries)
  - [Fighters](#fighters)
  - [Events](#events)
  - [Fights](#fights)
  - [Rankings](#rankings)
- [Mutations](#mutations)
  - [Fighters](#fighters-mutations)
  - [Events](#events-mutations)
  - [Fights](#fights-mutations)
  - [Rankings](#rankings-mutations)

## Queries

### Fighters

#### Get All Fighters
```graphql
query GetAllFighters {
  fighters {
    id
    firstName
    lastName
    nickname
    dateOfBirth
    nationality
    wins
    losses
    draws
    knockouts
    submissions
    weightClass
    currentRanking
    createdAt
    updatedAt
  }
}
```

#### Get Fighter by ID
```graphql
query GetFighter($id: ID!) {
  fighter(id: $id) {
    id
    firstName
    lastName
    nickname
    dateOfBirth
    nationality
    wins
    losses
    draws
    knockouts
    submissions
    weightClass
    currentRanking
    createdAt
    updatedAt
  }
}
```

Variables:
```json
{
  "id": "fighter-id-here"
}
```

### Events

#### Get All Events
```graphql
query GetAllEvents {
  events {
    id
    name
    date
    location
    description
    createdAt
    updatedAt
  }
}
```

#### Get Event by ID
```graphql
query GetEvent($id: ID!) {
  event(id: $id) {
    id
    name
    date
    location
    description
    fights {
      id
      fighter1 {
        id
        firstName
        lastName
      }
      fighter2 {
        id
        firstName
        lastName
      }
      winner {
        id
        firstName
        lastName
      }
      method
      round
      time
    }
    createdAt
    updatedAt
  }
}
```

Variables:
```json
{
  "id": "event-id-here"
}
```

### Fights

#### Get All Fights
```graphql
query GetAllFights {
  fights {
    id
    event {
      id
      name
    }
    fighter1 {
      id
      firstName
      lastName
    }
    fighter2 {
      id
      firstName
      lastName
    }
    winner {
      id
      firstName
      lastName
    }
    result
    rounds
    weightClass
    isCompleted
    createdAt
    updatedAt
  }
}
```

#### Get Fight by ID
```graphql
query GetFight($id: String!) {
  fight(id: $id) {
    id
    event {
      id
      name
    }
    fighter1 {
      id
      firstName
      lastName
      nickname
      weightClass
      currentRanking
    }
    fighter2 {
      id
      firstName
      lastName
      nickname
      weightClass
      currentRanking
    }
    winner {
      id
      firstName
      lastName
    }
    result
    rounds
    weightClass
    isCompleted
    createdAt
    updatedAt
  }
}
```

Variables:
```json
{
  "id": "fight-id-here"
}
```

### Rankings

#### Get All Rankings
```graphql
query GetAllRankings {
  rankings {
    id
    weightClass
    fighter {
      id
      firstName
      lastName
    }
    position
    points
    createdAt
    updatedAt
  }
}
```

#### Get Rankings by Weight Class
```graphql
query GetRankingsByWeightClass($weightClass: WeightClass!) {
  rankingsByWeightClass(weightClass: $weightClass) {
    id
    weightClass
    fighter {
      id
      firstName
      lastName
      nickname
    }
    position
    points
    createdAt
    updatedAt
  }
}
```

Variables:
```json
{
  "weightClass": "LIGHTWEIGHT"
}
```

## Mutations

### Fighters Mutations

#### Create Fighter
```graphql
mutation CreateFighter($input: CreateFighterInput!) {
  createFighter(input: $input) {
    id
    firstName
    lastName
    nickname
    dateOfBirth
    nationality
    wins
    losses
    draws
    knockouts
    submissions
    weightClass
    currentRanking
  }
}
```

Variables:
```json
{
  "input": {
    "firstName": "John",
    "lastName": "Doe",
    "nickname": "The Destroyer",
    "dateOfBirth": "1990-01-01",
    "nationality": "USA",
    "weightClass": "MIDDLEWEIGHT",
    "currentRanking": 5
  }
}
```

#### Update Fighter
```graphql
mutation UpdateFighter($id: ID!, $input: UpdateFighterInput!) {
  updateFighter(id: $id, input: $input) {
    id
    firstName
    lastName
    nickname
    dateOfBirth
    nationality
    wins
    losses
    draws
    knockouts
    submissions
    weightClass
    currentRanking
  }
}
```

Variables:
```json
{
  "id": "fighter-id-here",
  "input": {
    "firstName": "John",
    "lastName": "Doe",
    "nickname": "The Ultimate Destroyer",
    "dateOfBirth": "1990-01-01",
    "nationality": "USA",
    "weightClass": "MIDDLEWEIGHT",
    "currentRanking": 5,
    "wins": 10,
    "losses": 2,
    "draws": 0,
    "knockouts": 7,
    "submissions": 3
  }
}
```

#### Delete Fighter
```graphql
mutation DeleteFighter($id: ID!) {
  deleteFighter(id: $id)
}
```

Variables:
```json
{
  "id": "fighter-id-here"
}
```

### Events Mutations

#### Create Event
```graphql
mutation CreateEvent($createEventInput: CreateEventInput!) {
  createEvent(createEventInput: $createEventInput) {
    id
    name
    date
    location
    description
  }
}
```

Variables:
```json
{
  "createEventInput": {
    "name": "Ultimate Fighting Championship 300",
    "date": "2025-12-15T19:00:00.000Z",
    "location": "Las Vegas, Nevada",
    "description": "The 300th UFC event featuring championship fights"
  }
}
```

#### Update Event
```graphql
mutation UpdateEvent($id: String!, $updateEventInput: UpdateEventInput!) {
  updateEvent(id: $id, updateEventInput: $updateEventInput) {
    id
    name
    date
    location
    description
  }
}
```

Variables:
```json
{
  "id": "event-id-here",
  "updateEventInput": {
    "name": "UFC 300: Champions Clash",
    "date": "2025-12-16T20:00:00.000Z",
    "location": "Madison Square Garden, New York",
    "description": "Updated description for the event"
  }
}
```

#### Delete Event
```graphql
mutation RemoveEvent($id: String!) {
  removeEvent(id: $id)
}
```

Variables:
```json
{
  "id": "event-id-here"
}
```

### Fights Mutations

#### Create Fight
```graphql
mutation CreateFight($createFightInput: CreateFightInput!) {
  createFight(createFightInput: $createFightInput) {
    id
    event {
      id
      name
    }
    fighter1 {
      id
      firstName
      lastName
    }
    fighter2 {
      id
      firstName
      lastName
    }
    rounds
    weightClass
  }
}
```

Variables:
```json
{
  "createFightInput": {
    "eventId": "event-id-here",
    "fighter1Id": "fighter1-id-here",
    "fighter2Id": "fighter2-id-here",
    "weightClass": "MIDDLEWEIGHT",
    "rounds": 5
  }
}
```

#### Record Fight Result
```graphql
mutation RecordFightResult($id: String!, $result: String!, $winnerId: String!) {
  recordFightResult(id: $id, result: $result, winnerId: $winnerId) {
    id
    winner {
      id
      firstName
      lastName
    }
    result
    rounds
    isCompleted
  }
}
```

Variables:
```json
{
  "id": "fight-id-here",
  "result": "KNOCKOUT",
  "winnerId": "winner-fighter-id-here"
}
```

#### Delete Fight
```graphql
mutation RemoveFight($id: String!) {
  removeFight(id: $id)
}
```

Variables:
```json
{
  "id": "fight-id-here"
}
```

### Rankings Queries

#### Get Fighter Ranking
```graphql
query GetFighterRanking($fighterId: String!, $weightClass: String!) {
  fighterRanking(fighterId: $fighterId, weightClass: $weightClass) {
    id
    weightClass
    fighter {
      id
      firstName
      lastName
    }
    position
    points
  }
}
```

Variables:
```json
{
  "fighterId": "fighter-id-here",
  "weightClass": "MIDDLEWEIGHT"
}
```

## Using GraphQL Playground

1. Start your NestJS application
2. Navigate to http://localhost:3000/graphql in your browser
3. You'll see the GraphQL Playground interface
4. Copy and paste any of the above queries or mutations into the left panel
5. If the query/mutation requires variables, add them in the "Query Variables" section at the bottom
6. Click the "Play" button to execute the query/mutation
