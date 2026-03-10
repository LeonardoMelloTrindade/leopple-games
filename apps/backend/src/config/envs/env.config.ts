import 'dotenv/config';
import { IPostgreSqlEnv, IRedisEnv } from './env.interface';

const postgreSqlEnv: IPostgreSqlEnv = {
  host: process.env.POSTGRESQL_HOST || '',
  port: Number(process.env.POSTGRESQL_PORT) || 5432,
  username: process.env.POSTGRESQL_USER || '',
  password: process.env.POSTGRESQL_PASSWORD || '',
  database: process.env.POSTGRESQL_DATABASE || '',
};

const redisEnv: IRedisEnv = {
  host: process.env.REDIS_HOST || '',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || '',
};

export { postgreSqlEnv, redisEnv };
