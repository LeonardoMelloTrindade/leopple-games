import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: `
    Rules:\n
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
    At least 1 symbol: $ * & @ # \n
    do not allow repeated consecutive characters (aa, bb, 44, etc.)
`,
    example: 'cr7%my$goat2026',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(70)
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/i,
    {
      message:
        'password must have at least 1 uppercase, 1 number, 1 symbol ($*&@#), and no consecutive repeated characters',
    },
  )
  password: string;
}
