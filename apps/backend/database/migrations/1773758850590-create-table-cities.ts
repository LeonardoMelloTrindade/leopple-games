import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import cities from '../data/cities.json';

const tableName = 'cities';

export class CreateTableCities1773758850590 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            isUnique: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'capital',
            type: 'bool',
            isNullable: true,
          },
          {
            name: 'state_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: null,
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['state_id'],
        referencedTableName: 'states',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    for (const city of cities) {
      await queryRunner.query(
        `INSERT INTO ${tableName} (name, capital, state_id) VALUES ($1, $2, $3)`,
        [city.name, city.capital, city.stateId],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
