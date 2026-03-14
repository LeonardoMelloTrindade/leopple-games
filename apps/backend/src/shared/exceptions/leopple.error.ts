import { HttpException } from '@nestjs/common';
import { LeoppleErrorType } from './leopple.types';

export class LeoppleErrorLogger extends HttpException {
  /**
   * @param message Mensagem legível para o desenvolvedor ou usuário
   * @param errorCode Código interno do sistema (ex: 'RECORD_NOT_FOUND')
   * @param statusCode Código HTTP associado (ex: 404, 400, 502)
   * @param details Dados adicionais opicionais (ex: qual ID faltou, ou payload da API externa)
   */

  constructor({ details, errorCode, message, statusCode }: LeoppleErrorType) {
    super(
      {
        success: false,
        errorCode,
        message,
        details,
      },
      statusCode,
    );
  }
}
