import { Module } from '@nestjs/common';
import { PostgreModule } from './postgresql/postgre.module';

@Module({
  imports: [PostgreModule],
  exports: [PostgreModule],
})
export class DatabaseModule {}
