import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/shared';
import { UserService, UserResolver } from 'src/module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [UserService, UserResolver],
})
export class UserModule { }
