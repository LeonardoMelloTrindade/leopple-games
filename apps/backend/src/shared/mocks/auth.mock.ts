import { UserDto, RegisterDto } from '../../modules/auth/dto';

const mockUser: UserDto = {
  id: 1,
  email: 'test@user.com',
  password: 'hashedpassword',
  first_name: 'Test',
  last_name: 'User',
  city_id: 4,
  created_at: new Date(),
  updated_at: null,
};

const registerDto: RegisterDto = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'exist@test.com',
  password: '123',
  city_id: 1,
};

export { mockUser, registerDto };
