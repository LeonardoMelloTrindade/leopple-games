import { ArgumentMetadata, HttpStatus } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ValidatePipe } from './validate.pipe';
import { LeoppleErrorLogger } from '../exceptions/leopple.error';
import { LeoppleErrorCode } from '../exceptions/leopple.types';

class TestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

describe('ValidatePipe', () => {
  let pipe: ValidatePipe;

  beforeEach(() => {
    pipe = new ValidatePipe();
  });

  describe('transform', () => {
    it('deve retornar o valor sem validação quando metatype é undefined', async () => {
      const value = { email: 'not-valid' };
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: undefined,
        data: '',
      };

      const result = await pipe.transform(value, metadata);
      expect(result).toBe(value);
    });

    it('deve retornar o valor sem validação quando metatype é String', async () => {
      const value = 'some string';
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: String,
        data: '',
      };

      const result = await pipe.transform(value, metadata);
      expect(result).toBe(value);
    });

    it('deve retornar o valor sem validação quando metatype é Number', async () => {
      const value = 42;
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: Number,
        data: '',
      };

      const result = await pipe.transform(value, metadata);
      expect(result).toBe(value);
    });

    it('deve retornar o valor sem validação quando metatype é Boolean', async () => {
      const value = true;
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: Boolean,
        data: '',
      };

      const result = await pipe.transform(value, metadata);
      expect(result).toBe(value);
    });

    it('deve retornar o valor sem validação quando metatype é Array', async () => {
      const value = [1, 2, 3];
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: Array,
        data: '',
      };

      const result = await pipe.transform(value, metadata);
      expect(result).toBe(value);
    });

    it('deve retornar o valor sem validação quando metatype é Object', async () => {
      const value = { foo: 'bar' };
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: Object,
        data: '',
      };

      const result = await pipe.transform(value, metadata);
      expect(result).toBe(value);
    });

    it('deve retornar o valor quando o DTO é válido', async () => {
      const value = { email: 'valid@example.com', name: 'John' };
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: TestDto,
        data: '',
      };

      const result = await pipe.transform(value, metadata);
      expect(result).toBe(value);
    });

    it('deve lançar LeoppleErrorLogger com VALIDATION_FAILED quando o DTO tem campos inválidos', async () => {
      const value = { email: 'not-an-email', name: '' };
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: TestDto,
        data: '',
      };

      await expect(pipe.transform(value, metadata)).rejects.toThrow(
        LeoppleErrorLogger,
      );
    });

    it('deve lançar erro com statusCode BAD_REQUEST quando a validação falha', async () => {
      const value = { email: 'invalid', name: '' };
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: TestDto,
        data: '',
      };

      try {
        await pipe.transform(value, metadata);
        fail('Expected error to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(LeoppleErrorLogger);
        expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        const response = error.getResponse() as any;
        expect(response.errorCode).toBe(LeoppleErrorCode.VALIDATION_FAILED);
        expect(response.success).toBe(false);
        expect(response.message).toBe(
          'Validação dos dados falhou, verifique as regras dos campos.',
        );
      }
    });

    it('deve lançar erro com details contendo os erros de validação', async () => {
      const value = { email: 'invalid', name: '' };
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: TestDto,
        data: '',
      };

      try {
        await pipe.transform(value, metadata);
        fail('Expected error to be thrown');
      } catch (error) {
        const response = error.getResponse() as any;
        expect(Array.isArray(response.details)).toBe(true);
        expect(response.details.length).toBeGreaterThan(0);
      }
    });

    it('deve lançar erro quando campos obrigatórios estão ausentes no DTO', async () => {
      const value = {};
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: TestDto,
        data: '',
      };

      await expect(pipe.transform(value, metadata)).rejects.toThrow(
        LeoppleErrorLogger,
      );
    });

    it('deve retornar o valor original (não a instância transformada) quando o DTO é válido', async () => {
      const value = { email: 'valid@test.com', name: 'Jane' };
      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: TestDto,
        data: '',
      };

      const result = await pipe.transform(value, metadata);
      expect(result).toStrictEqual(value);
    });
  });
});
