import { Module } from '@nestjs/common';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';
import { ValidatePipe } from 'src/shared/pipes/validate.pipe';

@Module({
  controllers: [S3Controller],
  providers: [S3Service, ValidatePipe],
})
export class S3Module {}
