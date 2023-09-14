import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInputModel, UpdateUserInputModel, User } from '../../shared';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async createUser(data: CreateUserInputModel): Promise<User> {
    const user = this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);

    if (!userSaved) {
      throw new InternalServerErrorException(
        'Houve um problema na criação da Participação',
      );
    }

    return userSaved;
  }

  async updateUser(id: string, data: UpdateUserInputModel): Promise<User> {
    const user = await this.findUserById(id);

    await this.userRepository.update(user, { ...data });

    const userUpdated = this.userRepository.create({ ...user, ...data });

    return userUpdated;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.findUserById(id);

    if (!user) {
      return false;
    }

    await this.userRepository.delete(id);

    return true;
  }
}
