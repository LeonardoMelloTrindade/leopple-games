import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UploadDto {
  @ApiProperty({
    description: `
    Rules:\n
    File name and extension`,
    example: 'image.png',
  })
  @IsNotEmpty()
  @IsString()
  keyImage: string;

  @ApiProperty({
    description: `
    Rules:\n
    The file in Base64 format`,
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA4MAAA',
  })
  @IsNotEmpty()
  @IsString()
  avatarBase64: string;

  @ApiProperty({
    description: `
    Rules\n:
    The bucket is the user's email address\n
    Minimum 15 characters\n
    Maximum 70 characters`,

    example: 'cr7-goat@test.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(15, { message: 'Email is too short.' })
  @MaxLength(50, { message: 'Email is too long.' })
  bucket: string;
}
