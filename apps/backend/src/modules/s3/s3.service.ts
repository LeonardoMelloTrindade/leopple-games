import { HttpStatus, Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { s3Envs } from '../../config/envs/env.config';
import { LeoppleErrorLogger } from '../../shared/exceptions/leopple.error';
import { LeoppleErrorCode } from '../../shared/exceptions/leopple.types';
import { ManageFileS3Dto, UploadDto } from './dto';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor() {
    const { s3Region, s3Url, s3AccessKey, s3Secretey } = s3Envs;

    this.s3Client = new S3Client({
      region: s3Region,
      endpoint: s3Url,
      credentials: {
        accessKeyId: s3AccessKey,
        secretAccessKey: s3Secretey,
      },
      forcePathStyle: true,
    });
  }

  async uploadFile({
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

      const response = await this.s3Client.send(command);

      return {
        message: 'Upload concluído com sucesso!',
        code: response.$metadata.httpStatusCode,
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

  async downloadFile({ id, firstName, lastName, keyImage }: ManageFileS3Dto) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.buildBucketName(id, firstName, lastName),
        Key: keyImage,
      });

      const response = await this.s3Client.send(command);

      const stream = response.Body as Readable;
      const mime = response.ContentType;
      const buffer: Buffer = await this.streamToBuffer(stream);
      const base64String = buffer.toString('base64');

      return {
        code: response.$metadata.httpStatusCode,
        data: `data:${mime};base64,${base64String}`,
      };
    } catch (error) {
      throw new LeoppleErrorLogger({
        message: 'Erro ao buscar o arquivo no S3.',
        errorCode: LeoppleErrorCode.FILE_STORAGE_ERROR,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async removeFile({ id, firstName, lastName, keyImage }: ManageFileS3Dto) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.buildBucketName(id, firstName, lastName),
        Key: keyImage,
      });

      const response = await this.s3Client.send(command);

      return {
        code: response.$metadata.httpStatusCode,
        message: 'Arquivo deletado com sucesso',
      };
    } catch (error) {
      throw new LeoppleErrorLogger({
        message: 'Erro ao deletar o arquivo no S3.',
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

  private async streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk: Buffer) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
}
