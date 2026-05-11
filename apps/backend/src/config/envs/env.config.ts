import 'dotenv/config';
import { IPostgreSqlEnv, IRedisEnv, IS3Env } from './env.interface';

const postgreSqlEnv: IPostgreSqlEnv = {
  host: process.env.POSTGRESQL_HOST || '',
  port: Number(process.env.POSTGRESQL_PORT) || 5432,
  username: process.env.POSTGRESQL_USER || '',
  password: process.env.POSTGRESQL_PASSWORD || '',
  database: process.env.POSTGRESQL_DATABASE || '',
};

const redisEnv: IRedisEnv = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || '',
};

const s3Envs: IS3Env = {
  s3Url: process.env.S3_URL || 'http://localhost:9444',
  s3Region: process.env.S3_REGION || 'us-east-1',
  s3AccessKey: process.env.S3_ACCESS_KEY || 'your-access-key',
  s3Secretey: process.env.S3_SECRET_KEY || 'your-secret-key',
};

export { postgreSqlEnv, redisEnv, s3Envs };
