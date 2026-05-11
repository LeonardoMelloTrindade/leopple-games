import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UploadDto } from './upload.dto';

const validUploadData = {
  id: 4,
  firstName: 'John',
  lastName: 'Doe',
  keyImage: 'avatar.png',
  fileBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA4MAAA',
};

async function validateDto(data: object): Promise<string[]> {
  const dto = plainToInstance(UploadDto, data);
  const errors = await validate(dto);
  return errors.map((e) => Object.values(e.constraints || {}).join(', ')).flat();
}

describe('UploadDto', () => {
  it('deve aceitar um DTO completamente válido', async () => {
    const errors = await validateDto(validUploadData);
    expect(errors).toHaveLength(0);
  });

  describe('id', () => {
    it('deve rejeitar id ausente', async () => {
      const data = { ...validUploadData };
      delete (data as any).id;
      const errors = await validateDto(data);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar id como string', async () => {
      const errors = await validateDto({ ...validUploadData, id: 'not-a-number' });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve aceitar id como número inteiro', async () => {
      const errors = await validateDto({ ...validUploadData, id: 99 });
      expect(errors).toHaveLength(0);
    });
  });

  describe('firstName', () => {
    it('deve rejeitar firstName vazio', async () => {
      const errors = await validateDto({ ...validUploadData, firstName: '' });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar firstName ausente', async () => {
      const data = { ...validUploadData };
      delete (data as any).firstName;
      const errors = await validateDto(data);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar firstName não-string', async () => {
      const errors = await validateDto({ ...validUploadData, firstName: 123 });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve aceitar firstName válido', async () => {
      const errors = await validateDto({ ...validUploadData, firstName: 'Leonardo' });
      expect(errors).toHaveLength(0);
    });
  });

  describe('lastName', () => {
    it('deve rejeitar lastName vazio', async () => {
      const errors = await validateDto({ ...validUploadData, lastName: '' });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar lastName ausente', async () => {
      const data = { ...validUploadData };
      delete (data as any).lastName;
      const errors = await validateDto(data);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve aceitar lastName válido', async () => {
      const errors = await validateDto({ ...validUploadData, lastName: 'Silva' });
      expect(errors).toHaveLength(0);
    });
  });

  describe('keyImage', () => {
    it('deve rejeitar keyImage vazio', async () => {
      const errors = await validateDto({ ...validUploadData, keyImage: '' });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar keyImage ausente', async () => {
      const data = { ...validUploadData };
      delete (data as any).keyImage;
      const errors = await validateDto(data);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve aceitar keyImage com extensão de imagem', async () => {
      const errors = await validateDto({ ...validUploadData, keyImage: 'photo.jpg' });
      expect(errors).toHaveLength(0);
    });
  });

  describe('fileBase64', () => {
    it('deve rejeitar fileBase64 vazio', async () => {
      const errors = await validateDto({ ...validUploadData, fileBase64: '' });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar fileBase64 sem prefixo data URI', async () => {
      const errors = await validateDto({
        ...validUploadData,
        fileBase64: 'iVBORw0KGgoAAAANSUhEUgAAA4MAAA',
      });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar fileBase64 ausente', async () => {
      const data = { ...validUploadData };
      delete (data as any).fileBase64;
      const errors = await validateDto(data);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve aceitar fileBase64 com formato data URI de imagem PNG', async () => {
      const errors = await validateDto({
        ...validUploadData,
        fileBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA4MAAA',
      });
      expect(errors).toHaveLength(0);
    });

    it('deve aceitar fileBase64 com formato data URI de imagem JPEG', async () => {
      const errors = await validateDto({
        ...validUploadData,
        fileBase64: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD',
      });
      expect(errors).toHaveLength(0);
    });
  });

  describe('validação combinada', () => {
    it('deve rejeitar DTO sem nenhum campo', async () => {
      const errors = await validateDto({});
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve retornar múltiplos erros para DTO inválido em vários campos', async () => {
      const errors = await validateDto({
        id: 'bad',
        firstName: '',
        lastName: '',
        keyImage: '',
        fileBase64: 'not-a-data-uri',
      });
      expect(errors.length).toBeGreaterThan(1);
    });
  });
});