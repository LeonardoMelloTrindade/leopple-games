import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class LoginDto extends OmitType(UserDto, [
  'id',
  'avatar',
  'city_id',
  'first_name',
  'last_name',
  'created_at',
  'updated_at',
] as const) {}
