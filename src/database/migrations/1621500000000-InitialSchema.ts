import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1621500000000 implements MigrationInterface {
  name = 'InitialSchema1621500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // This migration is just a placeholder since we already have SQL scripts
    // In a real migration, you would include the SQL to create your schema
    // For example:

    // Create enum types
    await queryRunner.query(`
      CREATE TYPE IF NOT EXISTS "weight_class" AS ENUM (
        'FLYWEIGHT',
        'BANTAMWEIGHT',
        'FEATHERWEIGHT',
        'LIGHTWEIGHT',
        'WELTERWEIGHT',
        'MIDDLEWEIGHT',
        'LIGHT_HEAVYWEIGHT',
        'HEAVYWEIGHT'
      );
    `);

    await queryRunner.query(`
      CREATE TYPE IF NOT EXISTS "fight_result" AS ENUM (
        'KNOCKOUT',
        'SUBMISSION',
        'DECISION',
        'DRAW',
        'NO_CONTEST'
      );
    `);

    // This is just a placeholder - in a real scenario, you would include
    // all the table creation SQL statements here
    await queryRunner.query(`
      -- This is just a check to ensure the migration runs
      SELECT 1;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order to avoid foreign key constraints
    await queryRunner.query(`DROP TABLE IF EXISTS "rankings";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "fights";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "events";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "fighters";`);

    // Drop enum types
    await queryRunner.query(`DROP TYPE IF EXISTS "fight_result";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "weight_class";`);
  }
}
