import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import states from '../data/states.json';

const tableName = 'states';

export class CreateTableStates1773711408915 implements MigrationInterface {
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
            name: 'uf',
            type: 'varchar',
            length: '2',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
        ],
      }),
    );

    for (const state of states) {
      console.log(states);
      await queryRunner.query(
        `INSERT INTO ${tableName} (uf, name) VALUES ($1, $2)`,
        [state.uf, state.name],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
