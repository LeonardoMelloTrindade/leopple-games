import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgreSqlEnv } from '../../../config/envs/env.config';

const { host, database, password, port, username } = postgreSqlEnv;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host,
        port,
        username,
        password,
        database,
        entities: [],
        synchronize: true,
      }),
    }),
  ],
})
export class PostgreModule {}
