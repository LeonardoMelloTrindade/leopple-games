import { OmitType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class LoginDto extends OmitType(UserDto, ['password'] as const) {}
