import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { CreateUserInputModel, UpdateUserInputModel, User } from '../../shared';

describe('UserResolver', () => {
  let userResolver: UserResolver;

  const mockUserService = {
    findAllUsers: jest.fn(),
    findUserById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userResolver = module.get<UserResolver>(UserResolver);
  });

  describe('users', () => {
    it('should return an array of users', async () => {
      // Arrange
      const users: User[] = [
        { id: '1', firstName: 'John', lastName: 'Doe', participation: 50 },
        { id: '2', firstName: 'Jane', lastName: 'Smith', participation: 30 },
      ];
      mockUserService.findAllUsers.mockResolvedValue(users);

      // Act
      const result = await userResolver.users();

      // Assert
      expect(result).toEqual(users);
    });
  });

  describe('user', () => {
    it('should return a single user by id', async () => {
      // Arrange
      const userId = '1';
      const user: User = { id: userId ,firstName: 'John', lastName: 'Doe', participation: 50 };
      mockUserService.findUserById.mockResolvedValue(user);

      // Act
      const result = await userResolver.user(userId);

      // Assert
      expect(result).toEqual(user);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      // Arrange
      const userData: CreateUserInputModel = { firstName: 'Alice', lastName: 'Johnson', participation: 40 };
      const newUser: User = { id: '1', ...userData };
      mockUserService.createUser.mockResolvedValue(newUser);

      // Act
      const result = await userResolver.createUser(newUser);

      // Assert
      expect(result).toEqual(newUser);
    });
  });

  describe('updateUser', () => {
    it('should update a user by id', async () => {
      // Arrange
      const userId = '1';
      const userData: UpdateUserInputModel = { firstName: 'Bob', lastName: 'Smith', participation: 60 };
      const updatedUser: User = { id: userId, ...userData };
      mockUserService.updateUser.mockResolvedValue(updatedUser);

      // Act
      const result = await userResolver.updateUser(userId, userData);

      // Assert
      expect(result).toEqual(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by id', async () => {
      // Arrange
      const userId = '1';
      mockUserService.deleteUser.mockResolvedValue(true);

      // Act
      const result = await userResolver.deleteUser(userId);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false on error', async () => {
      // Arrange
      const userId = '1';
      mockUserService.deleteUser.mockRejectedValue(new Error('An error occurred'));

      // Act
      const result = await userResolver.deleteUser(userId);

      // Assert
      expect(result).toBe(false);
      expect(mockUserService.deleteUser).toHaveBeenCalledWith(userId);
    });
  });
});
