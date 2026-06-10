import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [],
  imports: [UsersModule],
})
export class ApiModule {}
