# MMA Platform GraphQL API Documentation

This document provides examples of how to use the GraphQL API for the MMA Platform.

## Fighters API

### Query Fighters

Retrieve a list of all fighters:

```graphql
query {
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
  }
}
```

### Query Fighter by ID

Retrieve a specific fighter by ID:

```graphql
query {
  fighter(id: "fighter-id-here") {
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

### Query Fighter Statistics

Get detailed statistics for a fighter:

```graphql
query {
  fighterStats(id: "fighter-id-here") {
    id
    firstName
    lastName
    nickname
    weightClass
    wins
    losses
    draws
    knockouts
    submissions
    winPercentage
    currentRanking
  }
}
```

### Query Fighter Fight History

Get a fighter's fight history:

```graphql
query {
  fighterHistory(id: "fighter-id-here") {
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
    event {
      id
      name
      date
    }
    weightClass
    rounds
    result
    winner {
      id
      firstName
      lastName
    }
    isCompleted
  }
}
```

### Query Fighters by Weight Class

Get all fighters in a specific weight class:

```graphql
query {
  fightersByWeightClass(weightClass: LIGHTWEIGHT) {
    id
    firstName
    lastName
    nickname
    wins
    losses
    draws
    currentRanking
  }
}
```

### Create Fighter

Create a new fighter:

```graphql
mutation {
  createFighter(input: {
    firstName: "John"
    lastName: "Doe"
    nickname: "The Destroyer"
    dateOfBirth: "1990-01-01"
    nationality: "USA"
    weightClass: LIGHTWEIGHT
  }) {
    id
    firstName
    lastName
    nickname
  }
}
```

### Update Fighter

Update an existing fighter:

```graphql
mutation {
  updateFighter(
    id: "fighter-id-here"
    input: {
      firstName: "John"
      lastName: "Smith"
      nickname: "The Machine"
      wins: 10
      losses: 2
      draws: 1
      knockouts: 5
      submissions: 3
    }
  ) {
    id
    firstName
    lastName
    nickname
    wins
    losses
    draws
    knockouts
    submissions
  }
}
```

### Delete Fighter

Delete a fighter:

```graphql
mutation {
  deleteFighter(id: "fighter-id-here")
}
```

## Events API

### Query Events

Retrieve a list of all events:

```graphql
query {
  events {
    id
    name
    location
    date
    description
  }
}
```

### Query Event by ID

Retrieve a specific event by ID:

```graphql
query {
  event(id: "event-id-here") {
    id
    name
    location
    date
    description
  }
}
```

### Query Upcoming Events

Get a list of upcoming events:

```graphql
query {
  upcomingEvents {
    id
    name
    location
    date
    description
  }
}
```

### Query Upcoming Events with Fight Cards

Get upcoming events with their complete fight cards:

```graphql
query {
  upcomingEventsWithFights {
    id
    name
    location
    date
    description
    fights {
      id
      fighter1 {
        id
        firstName
        lastName
        nickname
      }
      fighter2 {
        id
        firstName
        lastName
        nickname
      }
      weightClass
      rounds
    }
  }
}
```

### Query Event with Fight Card

Get a specific event with its complete fight card:

```graphql
query {
  eventWithFights(id: "event-id-here") {
    id
    name
    location
    date
    description
    fights {
      id
      fighter1 {
        id
        firstName
        lastName
        nickname
      }
      fighter2 {
        id
        firstName
        lastName
        nickname
      }
      weightClass
      rounds
      result
      winner {
        id
        firstName
        lastName
      }
      isCompleted
    }
  }
}
```

### Create Event

Create a new event:

```graphql
mutation {
  createEvent(
    createEventInput: {
      name: "UFC 300"
      location: "Las Vegas, NV"
      date: "2025-01-01T20:00:00Z"
      description: "The biggest event of the year"
    }
  ) {
    id
    name
    location
    date
    description
  }
}
```

### Update Event

Update an existing event:

```graphql
mutation {
  updateEvent(
    id: "event-id-here"
    updateEventInput: {
      name: "UFC 300: Champions Collide"
      description: "The most anticipated event of the decade"
    }
  ) {
    id
    name
    location
    date
    description
  }
}
```

### Delete Event

Delete an event:

```graphql
mutation {
  removeEvent(id: "event-id-here")
}
```

## Fights API

### Query Fights

Retrieve a list of all fights:

```graphql
query {
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
    event {
      id
      name
      date
    }
    weightClass
    rounds
    result
    winner {
      id
      firstName
      lastName
    }
    isCompleted
  }
}
```

### Query Fight by ID

Retrieve a specific fight by ID:

```graphql
query {
  fight(id: "fight-id-here") {
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
    event {
      id
      name
      date
    }
    weightClass
    rounds
    result
    winner {
      id
      firstName
      lastName
    }
    isCompleted
  }
}
```

### Query Fights by Event

Get all fights for a specific event:

```graphql
query {
  fightsByEvent(eventId: "event-id-here") {
    id
    fighter1 {
      id
      firstName
      lastName
      nickname
    }
    fighter2 {
      id
      firstName
      lastName
      nickname
    }
    weightClass
    rounds
    result
    winner {
      id
      firstName
      lastName
    }
    isCompleted
  }
}
```

### Create Fight

Create a new fight:

```graphql
mutation {
  createFight(
    createFightInput: {
      fighter1Id: "fighter1-id-here"
      fighter2Id: "fighter2-id-here"
      eventId: "event-id-here"
      weightClass: LIGHTWEIGHT
      rounds: 5
    }
  ) {
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
    event {
      id
      name
    }
    weightClass
    rounds
  }
}
```

### Record Fight Result

Record the result of a completed fight:

```graphql
mutation {
  recordFightResult(
    id: "fight-id-here"
    result: KNOCKOUT
    winnerId: "winner-fighter-id-here"
  ) {
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
    result
    winner {
      id
      firstName
      lastName
    }
    isCompleted
    isRankingUpdated
  }
}
```

### Update Fight

Update an existing fight:

```graphql
mutation {
  updateFight(
    id: "fight-id-here"
    updateFightInput: {
      rounds: 3
    }
  ) {
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
    rounds
  }
}
```

### Delete Fight

Delete a fight:

```graphql
mutation {
  removeFight(id: "fight-id-here")
}
```

## Rankings API

### Query Rankings

Retrieve all rankings across all weight classes:

```graphql
query {
  rankings {
    id
    fighter {
      id
      firstName
      lastName
      nickname
    }
    weightClass
    position
    points
  }
}
```

### Query Rankings by Weight Class

Get rankings for a specific weight class:

```graphql
query {
  rankingsByWeightClass(weightClass: LIGHTWEIGHT) {
    id
    fighter {
      id
      firstName
      lastName
      nickname
    }
    position
    points
  }
}
```
