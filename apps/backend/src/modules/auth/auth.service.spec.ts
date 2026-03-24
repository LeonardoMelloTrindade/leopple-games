import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { mockUser, registerDto } from '../../shared/mocks/auth.mock';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<Partial<UsersService>>;
  let jwtService: jest.Mocked<Partial<JwtService>>;

  beforeEach(async () => {
    const mockUsersService: Partial<UsersService> = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    const mockJwtService: Partial<JwtService> = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('deve retornar o usuário sem a senha quando o email e a senha estiverem corretos', async () => {
      (usersService.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await service('test@test.com', 'password123');

      expect(usersService.findByEmail).toHaveBeenCalledWith('test@test.com');
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashedpassword',
      );
    });

    it('deve retornar null se a senha estiver incorreta', async () => {
      (usersService.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser(
        'test@test.com',
        'wrongpassword',
      );

      expect(result).toBeUndefined();
    });

    it('deve retornar null se o usuário não for encontrado', async () => {
      (usersService.findByEmail as jest.Mock).mockResolvedValue(null);

      const result = await service.validateUser('notfound@test.com', '123456');

      expect(result).toBeNull();
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('deve retornar um token JWT válido', async () => {
      (jwtService.sign as jest.Mock).mockReturnValue('mock_token');

      const result = await service.login(mockUser);

      expect(jwtService.sign).toHaveBeenCalledWith({
        email: mockUser.email,
        sub: mockUser.id,
      });
      expect(result).toEqual({ access_token: 'mock_token' });
    });
  });

  describe('register', () => {
    it('deve cadastrar com sucesso um novo usuário e retornar um token', async () => {
      const mockSavedUser = {
        id: '999',
        ...registerDto,
        password: 'hashed_new_password',
      };

      (usersService.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_new_password');
      (usersService.create as jest.Mock).mockResolvedValue(mockSavedUser);
      (jwtService.sign as jest.Mock).mockReturnValue('new_jwt_token');

      const result = await service.register(registerDto);

      expect(usersService.findByEmail).toHaveBeenCalledWith('exist@test.com');
      expect(bcrypt.hash).toHaveBeenCalledWith('123', 10);
      expect(usersService.create).toHaveBeenCalledWith({
        ...registerDto,
        password: 'hashed_new_password',
      });
      expect(result).toEqual({ access_token: 'new_jwt_token' });
    });

    it('deve atirar UnauthorizedException se o email já estiver cadastrado', async () => {
      (usersService.findByEmail as jest.Mock).mockResolvedValue({
        id: '1',
        email: 'exist@test.com',
      });

      await expect(service.register(registerDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(usersService.create).not.toHaveBeenCalled();
    });
  });
});
