import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { S3Module } from './modules/s3/s3.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, S3Module],
  controllers: [],
  providers: [],
})
export class AppModule {}
