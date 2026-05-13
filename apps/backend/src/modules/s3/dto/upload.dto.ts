import { ApiProperty } from '@nestjs/swagger';
import { IsDataURI, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsValidImage } from '../../../shared/decorators/index';

export class UploadDto {
  @ApiProperty({
    description: `
    Rules:\n
    ID from User`,
    examples: [3, 44, 345],
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: `The user's first name`,
    examples: ['Leonardo', 'Lucas', 'Pedro'],
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: `The user's last name`,
    examples: ['Silva', 'Trindade', 'Soares'],
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

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
  @IsDataURI()
  @IsValidImage()
  fileBase64: string;
}
