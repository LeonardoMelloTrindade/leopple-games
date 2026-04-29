import { RegisterDto } from '../../modules/auth/dto';

const mockUser = {
  id: 1,
  email: 'test@user.com',
  password: 'hashedpassword',
  first_name: 'Test',
  avatar:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  last_name: 'User',
  city_id: 4,
  created_at: new Date(),
  updated_at: null,
};

const registerDto: RegisterDto = {
  first_name: 'John',
  last_name: 'Doe',
  avatar:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  email: 'exist@test.com',
  password: '123',
  city_id: 1,
};

export { mockUser, registerDto };
