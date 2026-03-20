import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsNumber()
  city_id: number;

  @IsString()
  created_at: Date;

  @IsString()
  @IsOptional()
  updated_at: Date | null;
}
