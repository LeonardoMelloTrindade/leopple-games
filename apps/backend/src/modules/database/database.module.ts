import { Module } from '@nestjs/common';
import { PostgreModule } from './postgresql/postgre.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [PostgreModule, RedisModule],
  exports: [PostgreModule, RedisModule],
})
export class DatabaseModule {}
