import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ManageFileS3Dto {
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
}
