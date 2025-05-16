-- Create enum types
CREATE TYPE "weight_class" AS ENUM (
  'FLYWEIGHT',
  'BANTAMWEIGHT',
  'FEATHERWEIGHT',
  'LIGHTWEIGHT',
  'WELTERWEIGHT',
  'MIDDLEWEIGHT',
  'LIGHT_HEAVYWEIGHT',
  'HEAVYWEIGHT'
);

CREATE TYPE "fight_result" AS ENUM (
  'KNOCKOUT',
  'SUBMISSION',
  'DECISION',
  'DRAW',
  'NO_CONTEST'
);

-- Create fighters table
CREATE TABLE "fighters" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "nickname" varchar,
  "date_of_birth" date NOT NULL,
  "nationality" varchar NOT NULL,
  "wins" int NOT NULL DEFAULT 0,
  "losses" int NOT NULL DEFAULT 0,
  "draws" int NOT NULL DEFAULT 0,
  "knockouts" int NOT NULL DEFAULT 0,
  "submissions" int NOT NULL DEFAULT 0,
  "weight_class" weight_class NOT NULL,
  "current_ranking" int,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

-- Create events table
CREATE TABLE "events" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" varchar NOT NULL,
  "location" varchar NOT NULL,
  "date" timestamp NOT NULL,
  "description" varchar,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

-- Create fights table
CREATE TABLE "fights" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "fighter1_id" uuid NOT NULL,
  "fighter2_id" uuid NOT NULL,
  "event_id" uuid NOT NULL,
  "weight_class" weight_class NOT NULL,
  "rounds" int NOT NULL,
  "result" fight_result,
  "winner_id" uuid,
  "is_completed" boolean NOT NULL DEFAULT false,
  "is_ranking_updated" boolean NOT NULL DEFAULT false,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now(),
  FOREIGN KEY ("fighter1_id") REFERENCES "fighters" ("id"),
  FOREIGN KEY ("fighter2_id") REFERENCES "fighters" ("id"),
  FOREIGN KEY ("event_id") REFERENCES "events" ("id"),
  FOREIGN KEY ("winner_id") REFERENCES "fighters" ("id")
);

-- Create rankings table
CREATE TABLE "rankings" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "fighter_id" uuid NOT NULL,
  "weight_class" weight_class NOT NULL,
  "position" int NOT NULL,
  "points" int NOT NULL DEFAULT 0,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now(),
  FOREIGN KEY ("fighter_id") REFERENCES "fighters" ("id"),
  UNIQUE ("fighter_id", "weight_class")
);

-- Create index for faster lookups
CREATE INDEX idx_rankings_weight_class ON rankings(weight_class);
CREATE INDEX idx_fighters_weight_class ON fighters(weight_class);
CREATE INDEX idx_fights_event_id ON fights(event_id);
CREATE INDEX idx_fights_fighters ON fights(fighter1_id, fighter2_id); 