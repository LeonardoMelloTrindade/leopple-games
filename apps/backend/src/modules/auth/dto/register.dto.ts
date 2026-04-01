import { UserDto } from './user.dto';
import { OmitType } from '@nestjs/swagger';

export class RegisterDto extends OmitType(UserDto, [
  'id',
  'created_at',
  'updated_at',
]) {}
