import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

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
  updated_at: Date;
}
