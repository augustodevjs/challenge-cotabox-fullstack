import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

import { UserService } from './user.service';

import { CreateUserInputModel, UpdateUserInputModel, User } from '../../shared';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    return await this.userService.findUserById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInputModel): Promise<User> {
    const user = await this.userService.createUser(data);
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInputModel,
  ): Promise<User> {
    return await this.userService.updateUser(id, data);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    try {
      await this.userService.deleteUser(id);
      return true; 
    } catch (error) {
      return false;
    }
  }
}
