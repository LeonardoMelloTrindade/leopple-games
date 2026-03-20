import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { mockUser, registerDto } from '../../shared/mocks/auth.mock';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<Partial<AuthService>>;

  beforeEach(async () => {
    const mockAuthService: Partial<AuthService> = {
      login: jest.fn(),
      register: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('deve chamar o serviço de login repassando o payload resolvido pelo LocalStrategy', async () => {
      (authService.login as jest.Mock).mockResolvedValue({
        access_token: 'valid_token',
      });

      const result = await controller.login(mockUser);

      expect(authService.login).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({ access_token: 'valid_token' });
    });
  });

  describe('register', () => {
    it('deve repassar o DTO de registro para o serviço AuthService', async () => {
      (authService.register as jest.Mock).mockResolvedValue({
        access_token: 'valid_token',
      });

      const result = await controller.register(registerDto);

      expect(authService.register).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual({ access_token: 'valid_token' });
    });
  });
});
