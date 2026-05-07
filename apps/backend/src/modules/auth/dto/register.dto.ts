import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: `
    Rules:
    Minimum 15 characters\n
    Maximum 70 characters`,

    example: 'cr7-goat@test.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(15, { message: 'Email is too short.' })
  @MaxLength(50, { message: 'Email is too long.' })
  email: string;

  @ApiProperty({
    description: `
    Rules: \n
    Minimum 8 characters \n
    Maximum 70 characters \n
    At least 1 uppercase letter \n
    At least 1 number \n
    At least 1 symbol: $ * & @ # % \n
    do not allow repeated consecutive characters (aa, bb, 44, etc.)
`,
    example: 'CR7%my$goat2026',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(70)
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%])(?:([0-9a-zA-Z$*&@#%])(?!\1)){8,}$/,
    {
      message:
        'password must have at least 1 uppercase, 1 number, 1 symbol ($*&@#%), and no consecutive repeated characters',
    },
  )
  password: string;

  @ApiProperty({
    description: `The user's first name`,
    examples: ['Leonardo', 'Lucas', 'Pedro'],
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: `The user's last name`,
    examples: ['Silva', 'Trindade', 'Soares'],
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ description: `The user's city ID`, example: 513 })
  @IsNumber()
  city_id: number;

  @ApiProperty({ description: `The user's photo encoded in Base64` })
  @IsString()
  @IsOptional()
  avatar: string | null;
}
