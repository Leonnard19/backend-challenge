import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDestinations1621893498642 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'destinations',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'country', type: 'varchar' },
          { name: 'location', type: 'varchar' },
          { name: 'meta', type: 'varchar' },
          { name: 'flag_url', type: 'varchar' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', isNullable: true },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('destinations');
  }
}
