# MMA Platform Ranking Algorithm Documentation

## Overview

The ranking algorithm determines the position of fighters within their respective weight classes based on their performance in fights. Rankings are automatically updated after each fight is completed and the result is recorded.

## Points System

The ranking algorithm uses a points-based system to determine fighter rankings:

1. **Win via Knockout or Submission**: 4 points
   - Demonstrates decisive victory and technical superiority
   - Rewards fighters who can finish fights conclusively

2. **Win via Decision**: 3 points
   - Demonstrates victory through consistent performance over multiple rounds
   - Slightly lower value than finishes to incentivize exciting fights

3. **Draw**: 1 point
   - Both fighters receive 1 point when a fight ends in a draw
   - Acknowledges competitive performance without decisive outcome

4. **Loss**: 0 points
   - No points are awarded for a loss
   - No distinction is made between different types of losses

## Ranking Calculation Process

The ranking algorithm follows these steps when processing a fight result:

1. **Points Calculation**:
   - When a fight is completed, the system calculates points based on the result
   - Points are added to the fighter's existing point total in their weight class

2. **Position Determination**:
   - All fighters in a weight class are sorted by their total points in descending order
   - Positions are assigned based on this ordering (1 for highest points, 2 for second highest, etc.)

3. **Fighter Record Update**:
   - The fighter's record (wins, losses, draws, knockouts, submissions) is updated
   - The current ranking field in the fighter entity is updated to reflect their new position

4. **Background Processing**:
   - Rankings are processed asynchronously to avoid blocking user operations
   - A scheduled task runs hourly to process any fights that haven't had rankings updated

## Tiebreaker Rules

When two or more fighters have the same number of points, the following tiebreakers are applied in order:

1. **Win Percentage**:
   - Calculated as (wins / total fights) * 100
   - Fighters with higher win percentages are ranked higher

2. **Recent Activity** (implemented in the sorting algorithm):
   - More recent fight activity is prioritized
   - This is implemented by the order of ranking updates, as newer fights will update rankings later

## Implementation Details

The ranking algorithm is implemented across several components:

1. **RankingsService** (`src/modules/rankings/application/rankings.service.ts`):
   - Handles finding and updating rankings for fighters
   - Recalculates positions within weight classes

2. **RankingService** (`src/modules/rankings/application/ranking.service.ts`):
   - Processes individual fight results
   - Calculates points based on fight outcomes
   - Updates fighter rankings

3. **FightsService** (`src/modules/fights/application/fights.service.ts`):
   - Triggers ranking updates when fight results are recorded

4. **RankingProcessorScheduler** (`src/modules/rankings/infrastructure/ranking-processor.scheduler.ts`):
   - Runs background processing for rankings
   - Ensures all completed fights have rankings updated

## Future Enhancements

Potential improvements to the ranking algorithm:

1. **Time Decay Factor**:
   - Gradually reduce the value of older fight results
   - Ensure rankings reflect recent performance more heavily

2. **Quality of Opposition**:
   - Award more points for defeating higher-ranked opponents
   - Penalize less for losing to higher-ranked opponents

3. **Performance Bonuses**:
   - Additional points for exceptional performances
   - Could be manually assigned by administrators

4. **Historical Ranking Tracking**:
   - Store historical ranking data to track fighter progression
   - Enable visualization of ranking changes over time
