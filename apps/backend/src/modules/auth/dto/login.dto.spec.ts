import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from './login.dto';

async function validateDto(data: object): Promise<string[]> {
  const dto = plainToInstance(LoginDto, data);
  const errors = await validate(dto);
  return errors.map((e) => Object.values(e.constraints || {}).join(', ')).flat();
}

describe('LoginDto', () => {
  describe('email', () => {
    it('deve aceitar um email válido com comprimento adequado', async () => {
      const errors = await validateDto({
        email: 'cr7-goat@test.com',
        password: 'CR7%my$goat2026',
      });
      expect(errors).toHaveLength(0);
    });

    it('deve rejeitar email com formato inválido', async () => {
      const errors = await validateDto({
        email: 'not-a-valid-email!!',
        password: 'CR7%my$goat2026',
      });
      expect(errors.some((e) => e.includes('email'))).toBe(true);
    });

    it('deve rejeitar email com menos de 15 caracteres', async () => {
      const errors = await validateDto({
        email: 'a@b.com',
        password: 'CR7%my$goat2026',
      });
      expect(errors.some((e) => e.toLowerCase().includes('short'))).toBe(true);
    });

    it('deve rejeitar email com mais de 50 caracteres', async () => {
      const longEmail = 'averylongemailaddress12345678901234@toolongdomain.com';
      const errors = await validateDto({
        email: longEmail,
        password: 'CR7%my$goat2026',
      });
      expect(errors.some((e) => e.toLowerCase().includes('long'))).toBe(true);
    });

    it('deve rejeitar quando email está vazio', async () => {
      const errors = await validateDto({
        email: '',
        password: 'CR7%my$goat2026',
      });
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('password', () => {
    it('deve aceitar uma senha válida com maiúscula, número e símbolo', async () => {
      const errors = await validateDto({
        email: 'cr7-goat@test.com',
        password: 'CR7%my$goat2026',
      });
      expect(errors).toHaveLength(0);
    });

    it('deve rejeitar senha sem letra maiúscula', async () => {
      const errors = await validateDto({
        email: 'cr7-goat@test.com',
        password: 'cr7%my$goat2026',
      });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar senha sem número', async () => {
      const errors = await validateDto({
        email: 'cr7-goat@test.com',
        password: 'CR%my$goatABCD',
      });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar senha sem símbolo ($*&@#%)', async () => {
      const errors = await validateDto({
        email: 'cr7-goat@test.com',
        password: 'CR7myGoat2026AB',
      });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar senha com menos de 8 caracteres', async () => {
      const errors = await validateDto({
        email: 'cr7-goat@test.com',
        password: 'CR7%a1',
      });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar senha com mais de 70 caracteres', async () => {
      const longPassword = 'CR7%my$goat2026' + 'A'.repeat(60);
      const errors = await validateDto({
        email: 'cr7-goat@test.com',
        password: longPassword,
      });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar senha com caracteres consecutivos repetidos (aa, bb)', async () => {
      const errors = await validateDto({
        email: 'cr7-goat@test.com',
        password: 'CR7%myGGoat2026',
      });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar senha vazia', async () => {
      const errors = await validateDto({
        email: 'cr7-goat@test.com',
        password: '',
      });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve aceitar senha com símbolo @ válido', async () => {
      const errors = await validateDto({
        email: 'cr7-goat@test.com',
        password: 'CR7@myGoat2026x',
      });
      expect(errors).toHaveLength(0);
    });

    it('deve aceitar senha com símbolo # válido', async () => {
      const errors = await validateDto({
        email: 'cr7-goat@test.com',
        password: 'CR7#myGoat2026x',
      });
      expect(errors).toHaveLength(0);
    });
  });

  describe('validação combinada', () => {
    it('deve retornar erros para email e senha quando ambos são inválidos', async () => {
      const errors = await validateDto({
        email: 'bad',
        password: 'weak',
      });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('deve rejeitar DTO sem nenhum campo', async () => {
      const errors = await validateDto({});
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});