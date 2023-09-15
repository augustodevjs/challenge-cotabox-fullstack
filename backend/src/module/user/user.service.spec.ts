import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

import { UserService } from "./user.service"
import { User } from "../../shared";

describe('UserService', () => {
  let service: UserService;
  const mockUser: User = { id: '1', firstName: 'João', lastName: 'Monteiro', participation: 50 }

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, {
        provide: getRepositoryToken(User),
        useValue: mockRepository
      }],
      
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  describe('findAllUsers', () => {
    it('should be list all users', async () => {
      // Arrange
      mockRepository.find.mockReturnValue([mockUser, mockUser]);

      // Act
      const users = await service.findAllUsers()

      // Assert
      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    })
  })

  describe('findUserById', () => {
    it('should find a existing user', async () => {
      // Arrange
      mockRepository.findOne.mockReturnValue(mockUser);

      // Act
      const foundUser = await service.findUserById('1');

      // Assert
      expect(foundUser).toEqual(mockUser);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return a exception if the user does not exist', () => {
      // Arrange
      mockRepository.findOne.mockReturnValue(null);

      // Act
      const findUser = service.findUserById('1');

      // Assert
      expect(findUser).rejects.toBeInstanceOf(NotFoundException)
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  })

  describe('when create a user', () => {
    it('should create a user', async () => {
      // Arrange
      mockRepository.create.mockReturnValue(mockUser);
      mockRepository.save.mockReturnValue(mockUser);

      // Act
      const savedUser = await service.createUser(mockUser);

      // Assert
      expect(savedUser).toEqual(mockUser);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    })

    it('should return expection when does not create a user', async () => {
      // Arrange
      mockRepository.create.mockReturnValue(null);
      mockRepository.save.mockReturnValue(null);

      // Act
      await service.createUser(mockUser).catch(error => {
        // Assert
        expect(error).toBeInstanceOf(InternalServerErrorException),
        expect(error).toMatchObject({
          message: 'Houve um problema na criação do usuário'
        });
      });

      // Assert
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    })
  })

  describe('when update a user', () => {
    it('should update a user', async () => {
      // Arrange
      const updatedUser =  { firstName: 'John' }
      mockRepository.findOne.mockReturnValue(mockUser);
      mockRepository.update.mockReturnValue({ ...mockUser, ...updatedUser });
      mockRepository.create.mockReturnValue({ ...mockUser, ...updatedUser });

      // Act
      const resultUser = await service.updateUser('1', {
        ...mockUser, ...updatedUser
      })

      // Assert
      expect(resultUser).toEqual({ ...mockUser, ...updatedUser });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    })
  })

  describe('when delete a user', () => {
    it('should delete a user', async () => {
      // Arrange
      const userId = '1'
      mockRepository.findOne.mockResolvedValue(userId);
      mockRepository.delete.mockReturnValue({ affected: 1 });

      // Act
      await service.deleteUser(userId);

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalledWith({ "where": {
        "id": userId
      } });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    })
  })
})