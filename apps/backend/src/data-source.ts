import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { postgreSqlEnv } from './config/envs/env.config';

const { host, database, password, port, username } = postgreSqlEnv;

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: [],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  migrationsRun: true,
  synchronize: true,
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
