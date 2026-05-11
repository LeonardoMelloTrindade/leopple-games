import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { RegisterDto } from './register.dto';

const validRegisterData = {
  email: 'cr7-goat@test.com',
  password: 'CR7%my$goat2026',
  first_name: 'John',
  last_name: 'Doe',
  city_id: 513,
  avatar: null,
};

async function validateDto(data: object): Promise<string[]> {
  const dto = plainToInstance(RegisterDto, data);
  const errors = await validate(dto);
  return errors.map((e) => Object.values(e.constraints || {}).join(', ')).flat();
}

describe('RegisterDto', () => {
  it('deve aceitar um DTO completamente válido', async () => {
    const errors = await validateDto(validRegisterData);
    expect(errors).toHaveLength(0);
  });

  it('deve aceitar um DTO válido sem avatar (campo opcional)', async () => {
    const data = { ...validRegisterData };
    delete (data as any).avatar;
    const errors = await validateDto(data);
    expect(errors).toHaveLength(0);
  });

  describe('email', () => {
    it('deve rejeitar email com formato inválido', async () => {
      const errors = await validateDto({ ...validRegisterData, email: 'notanemail' });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar email com menos de 15 caracteres', async () => {
      const errors = await validateDto({ ...validRegisterData, email: 'a@b.com' });
      expect(errors.some((e) => e.toLowerCase().includes('short'))).toBe(true);
    });

    it('deve rejeitar email com mais de 50 caracteres', async () => {
      const longEmail = 'averylongemailaddress12345678901234@toolongdomain.com';
      const errors = await validateDto({ ...validRegisterData, email: longEmail });
      expect(errors.some((e) => e.toLowerCase().includes('long'))).toBe(true);
    });

    it('deve rejeitar email vazio', async () => {
      const errors = await validateDto({ ...validRegisterData, email: '' });
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('password', () => {
    it('deve rejeitar senha sem letra maiúscula', async () => {
      const errors = await validateDto({
        ...validRegisterData,
        password: 'cr7%my$goat2026',
      });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar senha sem dígito', async () => {
      const errors = await validateDto({
        ...validRegisterData,
        password: 'CR%my$GoatABCD',
      });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar senha sem símbolo permitido ($*&@#%)', async () => {
      const errors = await validateDto({
        ...validRegisterData,
        password: 'CR7myGoat2026AB',
      });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar senha com caracteres consecutivos repetidos', async () => {
      const errors = await validateDto({
        ...validRegisterData,
        password: 'CR7%myGGoat2026',
      });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar senha com menos de 8 caracteres', async () => {
      const errors = await validateDto({
        ...validRegisterData,
        password: 'Cr7%aB',
      });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar senha vazia', async () => {
      const errors = await validateDto({ ...validRegisterData, password: '' });
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('first_name', () => {
    it('deve rejeitar first_name vazio', async () => {
      const errors = await validateDto({ ...validRegisterData, first_name: '' });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar first_name ausente', async () => {
      const data = { ...validRegisterData };
      delete (data as any).first_name;
      const errors = await validateDto(data);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar first_name com tipo não-string', async () => {
      const errors = await validateDto({ ...validRegisterData, first_name: 123 });
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('last_name', () => {
    it('deve rejeitar last_name vazio', async () => {
      const errors = await validateDto({ ...validRegisterData, last_name: '' });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar last_name ausente', async () => {
      const data = { ...validRegisterData };
      delete (data as any).last_name;
      const errors = await validateDto(data);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('city_id', () => {
    it('deve rejeitar city_id com tipo string', async () => {
      const errors = await validateDto({ ...validRegisterData, city_id: 'not-a-number' });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve aceitar city_id como número', async () => {
      const errors = await validateDto({ ...validRegisterData, city_id: 100 });
      expect(errors).toHaveLength(0);
    });
  });

  describe('avatar', () => {
    it('deve aceitar avatar como null', async () => {
      const errors = await validateDto({ ...validRegisterData, avatar: null });
      expect(errors).toHaveLength(0);
    });

    it('deve aceitar avatar como string base64', async () => {
      const errors = await validateDto({
        ...validRegisterData,
        avatar: 'data:image/png;base64,abc123',
      });
      expect(errors).toHaveLength(0);
    });

    it('deve aceitar ausência de avatar (IsOptional)', async () => {
      const data = { ...validRegisterData };
      delete (data as any).avatar;
      const errors = await validateDto(data);
      expect(errors).toHaveLength(0);
    });
  });

  describe('validação combinada', () => {
    it('deve retornar múltiplos erros para DTO completamente inválido', async () => {
      const errors = await validateDto({
        email: 'bad',
        password: 'weak',
        first_name: '',
        last_name: '',
        city_id: 'not-a-number',
      });
      expect(errors.length).toBeGreaterThan(1);
    });

    it('deve rejeitar DTO sem nenhum campo', async () => {
      const errors = await validateDto({});
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});