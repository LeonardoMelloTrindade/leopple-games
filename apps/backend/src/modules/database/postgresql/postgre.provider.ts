import { TypeOrmModule } from '@nestjs/typeorm';
import { postgreSqlEnv } from '../../../config/envs/env.config';

const { host, database, password, port, username } = postgreSqlEnv;

export const PostgreProvider = TypeOrmModule.forRootAsync({
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
});
