import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProfileImageToFighter1621500000001 implements MigrationInterface {
  name = 'AddProfileImageToFighter1621500000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add profile_image_url column to fighters table
    await queryRunner.query(`
      ALTER TABLE "fighters" 
      ADD COLUMN IF NOT EXISTS "profile_image_url" varchar NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove profile_image_url column from fighters table
    await queryRunner.query(`
      ALTER TABLE "fighters" 
      DROP COLUMN IF EXISTS "profile_image_url";
    `);
  }
}
