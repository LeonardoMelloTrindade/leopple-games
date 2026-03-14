import { Module } from '@nestjs/common';
import { PostgreProvider } from './postgre.provider';

@Module({
  imports: [PostgreProvider],
})
export class PostgreModule {}
