import { HttpStatus } from '@nestjs/common';

/**
 * DATABASE_CONNECTION_ERROR: Falha de conexão com banco de dados
 * RECORD_NOT_FOUND: Registro não foi encontrado
 * EXTERNAL_API_ERROR: Erro ao consumir API externa
 * VALIDATION_FAILED: Dados com formatação fora do padrão permitido do back-end
 * FILE_STORAGE_ERROR: Erro em operação de armazenamento de arquivo
 */
export enum LeoppleErrorCode {
  DATABASE_CONNECTION_ERROR = 'DATABASE_CONNECTION_ERROR',
  RECORD_NOT_FOUND = 'RECORD_NOT_FOUND',
  EXTERNAL_API_ERROR = 'EXTERNAL_API_ERROR',
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  FILE_STORAGE_ERROR = 'FILE_STORAGE_ERROR',
}

interface LeoppleErrorType {
  message: string;
  errorCode: LeoppleErrorCode;
  statusCode: HttpStatus;
  details: string | object | null | unknown;
}

export type { LeoppleErrorType };
