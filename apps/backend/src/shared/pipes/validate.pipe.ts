import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { LeoppleErrorLogger } from 'src/shared/exceptions/leopple.error';
import { LeoppleErrorCode } from 'src/shared/exceptions/leopple.types';

@Injectable()
export class ValidatePipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new LeoppleErrorLogger({
        message: 'Validação dos dados falhou, verifique as regras dos campos.',
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: LeoppleErrorCode.VALIDATION_FAILED,
        details: errors instanceof Error ? errors.message : errors,
      });
    }

    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
