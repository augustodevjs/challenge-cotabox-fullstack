import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service"
import { getRepositoryToken } from "@nestjs/typeorm";
import { User, TestUtil } from "../../shared";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

describe('UserService', () => {
  let service: UserService;

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
    mockRepository.create.mockReset(),
    mockRepository.findOne.mockReset(),
    mockRepository.create.mockReset(),
    mockRepository.save.mockReset(),
    mockRepository.update.mockReset(),
    mockRepository.delete.mockReset()
  });

  describe('When search all users', () => {
    it('should be list all users', async () => {
      // Arrange
      const user = TestUtil.giveMeValidUser();
      mockRepository.find.mockReturnValue([user, user]);

      // Act
      const users = await service.findAllUsers()

      // Assert
      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    })
  })

  describe('when search a user by id', () => {
    it('should find a existing user', async () => {
      // Arrange
      const user = TestUtil.giveMeValidUser();
      mockRepository.findOne.mockReturnValue(user);

      // Act
      const foundUser = await service.findUserById('1');

      // Assert
      expect(foundUser).toEqual(user);
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
      const user = TestUtil.giveMeValidUser();
      mockRepository.create.mockReturnValue(user);
      mockRepository.save.mockReturnValue(user);

      // Act
      const savedUser = await service.createUser(user);

      // Assert
      expect(savedUser).toEqual(user);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    })

    it('should return expection when does not create a user', async () => {
      // Arrange
      const user = TestUtil.giveMeValidUser();
      mockRepository.create.mockReturnValue(null);
      mockRepository.save.mockReturnValue(null);

      // Act
      await service.createUser(user).catch(error => {
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
      const user = TestUtil.giveMeValidUser();
      const updatedUser =  { firstName: 'John' }
      mockRepository.findOne.mockReturnValue(user);
      mockRepository.update.mockReturnValue({ ...user, ...updatedUser });
      mockRepository.create.mockReturnValue({ ...user, ...updatedUser });

      // Act
      const resultUser = await service.updateUser('1', {
        ...user, ...updatedUser
      })

      // Assert
      expect(resultUser).toEqual({ ...user, ...updatedUser });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    })
  })

  describe('when delete a user', () => {
    it('should delete a user', async () => {
      // Arrange
      const user = TestUtil.giveMeValidUser();
      mockRepository.findOne.mockReturnValue(user);
      mockRepository.delete.mockReturnValue({ affected: 1 });

      // Act
      const deletedUser = await service.deleteUser('1');

      // Assert
      expect(deletedUser).toBe(true);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    })

    it('should not delete a inexisting user', async () => {
      // Arrange
      const user = TestUtil.giveMeValidUser();
      mockRepository.delete.mockReturnValue(null)
      mockRepository.findOne.mockReturnValue(user)
    
      // Act
      const deletedUser = await service.deleteUser('1');
    
      // Assert
      expect(deletedUser).toBe(false);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalled();
    });
  })
})