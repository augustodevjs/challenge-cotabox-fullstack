import { Module } from '@nestjs/common';
import { UserService } from 'src/module/user/user.service';
import { UserResolver } from 'src/module/user/user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [UserService, UserResolver],
})
export class UserModule { }
