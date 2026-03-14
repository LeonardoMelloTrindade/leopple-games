import { HttpStatus } from '@nestjs/common';

/**
 * DATABASE_CONNECTION_ERROR: Falha de conexão com banco de dados
 * RECORD_NOT_FOUND: Registro não foi encontrado
 * EXTERNAL_API_ERROR: Erro ao consumir API externa
 * VALIDATION_FAILED: Dados com formatação fora do padrão permitido do back-end
 */
type LeoppleErrorCode =
  | 'DATABASE_CONNECTION_ERROR'
  | 'RECORD_NOT_FOUND'
  | 'EXTERNAL_API_ERROR'
  | 'VALIDATION_FAILED';

interface LeoppleErrorType {
  message: string;
  errorCode: LeoppleErrorCode;
  statusCode: HttpStatus;
  details: string | null;
}

export type { LeoppleErrorCode, LeoppleErrorType };
