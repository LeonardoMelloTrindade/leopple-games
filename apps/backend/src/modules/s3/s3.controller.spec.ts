import { Test, TestingModule } from '@nestjs/testing';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  uploadFilePayloadMock,
  downloadFilePayloadMock,
  removeFilePayloadMock,
} from '../../shared/mocks/s3.mock';

describe('S3Controller', () => {
  let controller: S3Controller;
  let s3Service: jest.Mocked<Partial<S3Service>>;

  beforeEach(async () => {
    const mockS3Service: Partial<S3Service> = {
      uploadFile: jest.fn(),
      downloadFile: jest.fn(),
      removeFile: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [S3Controller],
      providers: [
        {
          provide: S3Service,
          useValue: mockS3Service,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<S3Controller>(S3Controller);
    s3Service = module.get(S3Service);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadFile', () => {
    it('Should call s3Service.uploadFile with the correct payload', async () => {
      const expectedResponse = {
        message: 'Upload concluído com sucesso!',
        code: 200,
      };
      (s3Service.uploadFile as jest.Mock).mockResolvedValue(expectedResponse);

      const result = await controller.uploadFile(uploadFilePayloadMock);

      expect(s3Service.uploadFile).toHaveBeenCalledWith(uploadFilePayloadMock);
      expect(result).toEqual(expectedResponse);
    });

    it('Should propagate the error when s3Service.uploadFile throws an exception', async () => {
      const error = new Error('S3 upload failed');
      (s3Service.uploadFile as jest.Mock).mockRejectedValue(error);

      await expect(
        controller.uploadFile(uploadFilePayloadMock),
      ).rejects.toThrow(error);
    });
  });

  describe('downloadFile', () => {
    it('Should call s3Service.downloadFile with the correct payload', async () => {
      const expectedResponse = {
        code: 200,
        data: 'data:image/png;base64,abc123',
      };
      (s3Service.downloadFile as jest.Mock).mockResolvedValue(expectedResponse);

      const result = await controller.downloadFile(downloadFilePayloadMock);

      expect(s3Service.downloadFile).toHaveBeenCalledWith(
        downloadFilePayloadMock,
      );
      expect(result).toEqual(expectedResponse);
    });

    it('Should propagate the error when s3Service.downloadFile throws an exception', async () => {
      const error = new Error('S3 download failed');
      (s3Service.downloadFile as jest.Mock).mockRejectedValue(error);

      await expect(
        controller.downloadFile(downloadFilePayloadMock),
      ).rejects.toThrow(error);
    });
  });

  describe('removeFile', () => {
    it('Should call s3Service.removeFile with the correct payload', async () => {
      const expectedResponse = {
        code: 204,
        message: 'Arquivo deletado com sucesso',
      };
      (s3Service.removeFile as jest.Mock).mockResolvedValue(expectedResponse);

      const result = await controller.removeFile(removeFilePayloadMock);

      expect(s3Service.removeFile).toHaveBeenCalledWith(removeFilePayloadMock);
      expect(result).toEqual(expectedResponse);
    });

    it('Should propagate the error when s3Service.removeFile throws an exception', async () => {
      const error = new Error('S3 delete failed');
      (s3Service.removeFile as jest.Mock).mockRejectedValue(error);

      await expect(
        controller.removeFile(removeFilePayloadMock),
      ).rejects.toThrow(error);
    });

    it('Should return the removeFile result with status code 204', async () => {
      (s3Service.removeFile as jest.Mock).mockResolvedValue({
        code: 204,
        message: 'Arquivo deletado com sucesso',
      });

      const result = await controller.removeFile(removeFilePayloadMock);

      expect(result).toHaveProperty('code', 204);
      expect(result).toHaveProperty('message', 'Arquivo deletado com sucesso');
    });
  });
});
