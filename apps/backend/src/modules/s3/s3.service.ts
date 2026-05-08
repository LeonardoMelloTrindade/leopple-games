import { HttpStatus, Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Envs } from '../../config/envs/env.config';
import { LeoppleErrorLogger } from '../../shared/exceptions/leopple.error';
import { LeoppleErrorCode } from '../../shared/exceptions/leopple.types';
import { UploadDto } from './dto';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor() {
    const { s3_region, s3_url, s3_access_key, s3_secret_key } = s3Envs;

    this.s3Client = new S3Client({
      region: s3_region,
      endpoint: s3_url,
      credentials: {
        accessKeyId: s3_access_key,
        secretAccessKey: s3_secret_key,
      },
      forcePathStyle: true,
    });
  }

  async uploadImage({
    fileBase64,
    keyImage,
    id,
    firstName,
    lastName,
  }: UploadDto) {
    try {
      const command = new PutObjectCommand({
        Bucket: this.buildBucketName(id, firstName, lastName),
        Key: keyImage,
        Body: this.convertToBuffer(fileBase64),
        ContentType: this.getMimeFile(fileBase64),
      });

      await this.s3Client.send(command);

      return {
        message: 'Upload concluído com sucesso!',
        fileKey: keyImage,
      };
    } catch (error) {
      throw new LeoppleErrorLogger({
        message: 'Erro ao salvar o arquivo no S3.',
        errorCode: LeoppleErrorCode.FILE_STORAGE_ERROR,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }

  private getMimeFile(fileBase64: string): string {
    const begin = fileBase64.indexOf('data:') + 5;
    const end = fileBase64.indexOf(';');

    const mime = fileBase64.slice(begin, end).trim();
    return mime;
  }

  private convertToBuffer(fileBase64: string): Buffer<ArrayBuffer> {
    const base64Data = fileBase64.replace(/^data:.*;base64,/, '');

    return Buffer.from(base64Data, 'base64');
  }

  private buildBucketName(
    id: number,
    firstName: string,
    lastName: string,
  ): string {
    return `${String(id)}-${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
  }
}
