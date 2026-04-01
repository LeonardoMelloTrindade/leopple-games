import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import {
  repositoryMockFactory,
  MockType,
} from '../../shared/mocks/repository.mock';
import { LeoppleErrorLogger } from '../../shared/exceptions/leopple.error';
import { registerDto, mockUser } from '../../shared/mocks/auth.mock';

describe('UsersService', () => {
  let service: UsersService;
  let repositoryMock: MockType<Repository<Users>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repositoryMock = module.get(getRepositoryToken(Users));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('findByEmail', () => {
    it('deve retornar o usuário quando encontrado no banco', async () => {
      repositoryMock.findOne?.mockResolvedValue(mockUser);

      const result = await service.findByEmail('test@test.com');

      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { email: 'test@test.com' },
      });
      expect(result).toEqual(mockUser);
    });

    it('deve retornar null se o usuário não for encontrado', async () => {
      repositoryMock.findOne?.mockResolvedValue(null);
      const result = await service.findByEmail('none@test.com');
      expect(result).toBeNull();
    });

    it('deve atirar um LeoppleErrorLogger se o repositório falhar (Erro do banco)', async () => {
      repositoryMock.findOne?.mockRejectedValue(new Error('Connection Failed'));

      await expect(service.findByEmail('test@test.com')).rejects.toThrow(
        LeoppleErrorLogger,
      );
      await expect(service.findByEmail('test@test.com')).rejects.toMatchObject({
        response: {
          success: false,
          errorCode: 'DATABASE_CONNECTION_ERROR',
          message: 'Erro ao buscar usuário por email.',
          details: 'Connection Failed',
        },
      });
    });
  });

  describe('create', () => {
    it('deve salvar e retornar o novo usuário corretamente', async () => {
      repositoryMock.create?.mockReturnValue(registerDto);
      repositoryMock.save?.mockResolvedValue(mockUser);

      const result = await service.create(registerDto);

      expect(repositoryMock.create).toHaveBeenCalledWith(registerDto);
      expect(repositoryMock.save).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual(mockUser);
    });

    it('deve atirar um LeoppleErrorLogger se ocorrer uma falha ao persistir no DB', async () => {
      const newUserDto = { email: 'fail@test.com' };
      repositoryMock.create?.mockReturnValue(newUserDto as any);
      repositoryMock.save?.mockRejectedValue(new Error('DB Timeout'));

      try {
        await service.create(newUserDto);
        fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).toBeInstanceOf(LeoppleErrorLogger);
        expect((error as any).getResponse()).toEqual({
          success: false,
          errorCode: 'DATABASE_CONNECTION_ERROR',
          message: 'Erro ao criar usuário.',
          details: 'DB Timeout',
        });
      }
    });
  });
});
