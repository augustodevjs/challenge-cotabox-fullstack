import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

import { UserService } from "./user.service"
import { UpdateUserInputModel, User } from "../../shared";

describe('UserService', () => {
  let service: UserService;
  const mockUser: User = { id: '1', firstName: 'João', lastName: 'Monteiro', participation: 1 }

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
      const arrayMock = [mockUser]
      mockRepository.find.mockReturnValue(arrayMock);

      // Act
      const users = await service.findAllUsers()

      // Assert
      expect(users).toEqual(arrayMock)
      expect(users).toHaveLength(1);
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
      const findUser = service.findUserById('23');

      // Assert
      expect(findUser).rejects.toThrowError(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  })

  describe('CreateUser', () => {
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
      const result = await service.createUser(mockUser).catch(error => {
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

  describe('UpdateUser', () => {
    it('should update a user', async () => {
      // Arrange
      const updateUserInputModel: UpdateUserInputModel =  { firstName: 'John', lastName: 'Robert', participation: 1 }
      const updatedUser = { ...mockUser, ...updateUserInputModel }
      mockRepository.findOne.mockReturnValue(mockUser);
      mockRepository.update.mockReturnValue(updatedUser);

      // Act
      const resultUser = await service.updateUser('1', updatedUser)

      // Assert
      expect(resultUser).toEqual(updatedUser);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
    })
  })

  describe('DeleteUser', () => {
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