import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ManageFileS3Dto } from './manageFIleS3';

const validManageFileData = {
  id: 55,
  firstName: 'John',
  lastName: 'Smith',
  keyImage: 'avatar34.png',
};

async function validateDto(data: object): Promise<string[]> {
  const dto = plainToInstance(ManageFileS3Dto, data);
  const errors = await validate(dto);
  return errors.map((e) => Object.values(e.constraints || {}).join(', ')).flat();
}

describe('ManageFileS3Dto', () => {
  it('deve aceitar um DTO completamente válido', async () => {
    const errors = await validateDto(validManageFileData);
    expect(errors).toHaveLength(0);
  });

  describe('id', () => {
    it('deve rejeitar id ausente', async () => {
      const data = { ...validManageFileData };
      delete (data as any).id;
      const errors = await validateDto(data);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar id como string', async () => {
      const errors = await validateDto({ ...validManageFileData, id: 'not-a-number' });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve aceitar id como número inteiro positivo', async () => {
      const errors = await validateDto({ ...validManageFileData, id: 1 });
      expect(errors).toHaveLength(0);
    });

    it('deve aceitar id com valor grande', async () => {
      const errors = await validateDto({ ...validManageFileData, id: 999999 });
      expect(errors).toHaveLength(0);
    });
  });

  describe('firstName', () => {
    it('deve rejeitar firstName vazio', async () => {
      const errors = await validateDto({ ...validManageFileData, firstName: '' });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar firstName ausente', async () => {
      const data = { ...validManageFileData };
      delete (data as any).firstName;
      const errors = await validateDto(data);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar firstName não-string', async () => {
      const errors = await validateDto({ ...validManageFileData, firstName: 42 });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve aceitar firstName com string válida', async () => {
      const errors = await validateDto({ ...validManageFileData, firstName: 'Leonardo' });
      expect(errors).toHaveLength(0);
    });
  });

  describe('lastName', () => {
    it('deve rejeitar lastName vazio', async () => {
      const errors = await validateDto({ ...validManageFileData, lastName: '' });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar lastName ausente', async () => {
      const data = { ...validManageFileData };
      delete (data as any).lastName;
      const errors = await validateDto(data);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar lastName não-string', async () => {
      const errors = await validateDto({ ...validManageFileData, lastName: true });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve aceitar lastName com string válida', async () => {
      const errors = await validateDto({ ...validManageFileData, lastName: 'Trindade' });
      expect(errors).toHaveLength(0);
    });
  });

  describe('keyImage', () => {
    it('deve rejeitar keyImage vazio', async () => {
      const errors = await validateDto({ ...validManageFileData, keyImage: '' });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar keyImage ausente', async () => {
      const data = { ...validManageFileData };
      delete (data as any).keyImage;
      const errors = await validateDto(data);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve aceitar keyImage com nome de arquivo e extensão', async () => {
      const errors = await validateDto({ ...validManageFileData, keyImage: 'photo.jpg' });
      expect(errors).toHaveLength(0);
    });

    it('deve aceitar keyImage com nome de arquivo sem extensão', async () => {
      const errors = await validateDto({ ...validManageFileData, keyImage: 'myfile' });
      expect(errors).toHaveLength(0);
    });
  });

  describe('validação combinada', () => {
    it('deve rejeitar DTO sem nenhum campo', async () => {
      const errors = await validateDto({});
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve retornar múltiplos erros para DTO completamente inválido', async () => {
      const errors = await validateDto({
        id: 'bad',
        firstName: '',
        lastName: '',
        keyImage: '',
      });
      expect(errors.length).toBeGreaterThan(1);
    });

    it('deve aceitar DTO com diferentes tipos de extensão de imagem', async () => {
      const extensions = ['image.png', 'image.jpg', 'image.gif', 'image.webp'];
      for (const keyImage of extensions) {
        const errors = await validateDto({ ...validManageFileData, keyImage });
        expect(errors).toHaveLength(0);
      }
    });
  });
});