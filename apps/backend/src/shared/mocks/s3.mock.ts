import { ManageFileS3Dto, UploadDto } from '../../modules/s3/dto';

const uploadFilePayloadMock: UploadDto = {
  id: 4,
  firstName: 'John',
  lastName: 'Doe',
  keyImage: 'avatar.png',
  fileBase64: 'data:image/png;base64,Y7YI7uY98I79hkuhhy987y',
};

const returnedUploadFileMock = {
  Bucket: '4-john-doe',
  Key: 'avatar.png',
  ContentType: 'image/png',
};

const downloadFilePayloadMock: ManageFileS3Dto = {
  id: 55,
  firstName: 'John',
  lastName: 'Smith',
  keyImage: 'avatar34.png',
};

const returnedDownloadFileMock = {
  Bucket: '55-john-smith',
  Key: 'avatar34.png',
};

const removeFilePayloadMock: ManageFileS3Dto = {
  id: 55,
  firstName: 'john',
  lastName: 'smith',
  keyImage: 'avatar.png',
};

const returnedRemoveFileMock = {
  Bucket: '55-john-smith',
  Key: 'avatar.png',
};

export {
  uploadFilePayloadMock,
  returnedUploadFileMock,
  downloadFilePayloadMock,
  returnedDownloadFileMock,
  removeFilePayloadMock,
  returnedRemoveFileMock,
};
