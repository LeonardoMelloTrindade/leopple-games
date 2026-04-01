import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'Unique user ID', example: 7 })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: `User's email address`,
    example: 'cr7-goat@test.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: `User's password`, example: 'cr7%my$goat2026' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: `The user's first name`,
    examples: ['Leonardo', 'Lucas', 'Pedro'],
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    description: `The user's first name`,
    examples: ['Silva', 'Trindade', 'Soares'],
  })
  @IsString()
  last_name: string;

  @ApiProperty({ description: `The user's city ID`, example: 513 })
  @IsNumber()
  city_id: number;

  @ApiProperty({ description: `The user's photo encoded in Base64` })
  @IsString()
  @IsOptional()
  avatar: string | null;

  @ApiProperty({
    description: 'The date the record was created in the database',
    example: '2026-03-19 18:31:20.530789',
  })
  @IsString()
  created_at: Date;

  @ApiProperty({
    description: 'The date the record was updated in the database',
    example: '2026-03-20 15:17:13.39998',
  })
  @IsString()
  @IsOptional()
  updated_at: Date | null;
}
