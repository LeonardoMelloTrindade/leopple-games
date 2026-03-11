import { Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { redisEnv } from 'src/config/envs/env.config';

const { host, password, port } = redisEnv;

export const RedisProvider: Provider = {
  provide: 'REDIS_CLIENT',
  useFactory: () => {
    return new Redis({
      host,
      port,
      password,
    });
  },
};
