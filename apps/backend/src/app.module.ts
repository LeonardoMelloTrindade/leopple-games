import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
