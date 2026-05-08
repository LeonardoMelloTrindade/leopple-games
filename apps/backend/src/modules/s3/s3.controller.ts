import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { S3Service } from './s3.service';
import { ValidatePipe } from '../../shared/pipes/validate.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadDto, ManageFileS3Dto } from './dto';

@ApiTags('s3')
@Controller('s3')
@UseGuards(JwtAuthGuard)
@UsePipes(ValidatePipe)
export class S3Controller {
  constructor(private s3Service: S3Service) {}

  @Post()
  async uploadFile(@Body() payload: UploadDto) {
    return await this.s3Service.uploadFile(payload);
  }

  @Get()
  async downloadFile(@Body() payload: ManageFileS3Dto) {
    return await this.s3Service.downloadFile(payload);
  }

  @Delete()
  async removeFile(@Body() payload: ManageFileS3Dto) {
    return await this.s3Service.removeFile(payload);
  }
}
