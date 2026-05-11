import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { S3Service } from './s3.service';
import {
  downloadFilePayloadMock,
  removeFilePayloadMock,
  returnedDownloadFileMock,
  returnedRemoveFileMock,
  returnedUploadFileMock,
  uploadFilePayloadMock,
} from '../../shared/mocks/s3.mock';
import { LeoppleErrorLogger } from '../../shared/exceptions/leopple.error';
import { LeoppleErrorCode } from '../../shared/exceptions/leopple.types';
import { Readable } from 'stream';

jest.mock('../../config/envs/env.config', () => ({
  s3Envs: {
    s3_region: 'us-east-1',
    s3Url: 'http://localhost:9000',
    s3AccessKey: 'test',
    s3Secretey: 'test',
  },
}));

describe('S3Service', () => {
  let s3Service: S3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3Service],
    }).compile();

    s3Service = module.get<S3Service>(S3Service);
  });

  describe('uploadFile', () => {
    it('Should upload file in S3', async () => {
      const sendSpy = jest
        .spyOn(s3Service['s3Client'] as any, 'send')
        .mockResolvedValue({
          $metadata: { httpStatusCode: 200 },
        });

      const response = await s3Service.uploadFile(uploadFilePayloadMock);

      expect(response).toEqual({
        message: 'Upload concluído com sucesso!',
        code: 200,
      });

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          input: expect.objectContaining(returnedUploadFileMock),
        }),
      );
    });

    it('Should not upload file in S3', async () => {
      jest
        .spyOn(s3Service['s3Client'] as any, 'send')
        .mockRejectedValue({ $metadata: { httpStatusCode: 500 } });

      await expect(s3Service.uploadFile(uploadFilePayloadMock)).rejects.toThrow(
        new LeoppleErrorLogger({
          message: 'Erro ao salvar o arquivo no S3.',
          errorCode: LeoppleErrorCode.FILE_STORAGE_ERROR,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          details: null,
        }),
      );
    });
  });

  describe('downloadImage', () => {
    it('Should download image in S3', async () => {
      const fakeStream = new Readable({
        read() {
          this.push(Buffer.from('Y7YI7uY98I79hkuhhy987y', 'base64'));
          this.push(null);
        },
      });

      const sendSpy = jest
        .spyOn(s3Service['s3Client'] as any, 'send')
        .mockResolvedValue({
          $metadata: { httpStatusCode: 200 },
          Body: fakeStream,
          ContentType: 'image/jpg',
        });

      const response = await s3Service.downloadFile(downloadFilePayloadMock);

      expect(response).toEqual({
        code: 200,
        data: 'data:image/jpg;base64,Y7YI7uY98I79hkuhhy987w==',
      });

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          input: expect.objectContaining(returnedDownloadFileMock),
        }),
      );
    });

    it('Should not download image in S3', async () => {
      jest.spyOn(s3Service['s3Client'] as any, 'send').mockRejectedValue({
        $metadata: { httpStatusCode: 500 },
      });

      await expect(
        s3Service.downloadFile(downloadFilePayloadMock),
      ).rejects.toThrow(
        new LeoppleErrorLogger({
          message: 'Erro ao buscar o arquivo no S3.',
          errorCode: LeoppleErrorCode.FILE_STORAGE_ERROR,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          details: null,
        }),
      );
    });
  });

  describe('removeFile', () => {
    it('Should remove file in S3', async () => {
      const sendSpy = jest
        .spyOn(s3Service['s3Client'] as any, 'send')
        .mockResolvedValue({
          $metadata: { httpStatusCode: 204 },
        });

      const response = await s3Service.removeFile(removeFilePayloadMock);

      expect(response).toEqual({
        code: 204,
        message: 'Arquivo deletado com sucesso',
      });

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          input: expect.objectContaining(returnedRemoveFileMock),
        }),
      );
    });

    it('Should not remove file in S3', async () => {
      jest
        .spyOn(s3Service['s3Client'] as any, 'send')
        .mockRejectedValue(new Error('Connection refused'));

      await expect(s3Service.removeFile(removeFilePayloadMock)).rejects.toThrow(
        new LeoppleErrorLogger({
          message: 'Erro ao deletar o arquivo no S3.',
          errorCode: LeoppleErrorCode.FILE_STORAGE_ERROR,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          details: 'Connection refused',
        }),
      );
    });
  });
});
