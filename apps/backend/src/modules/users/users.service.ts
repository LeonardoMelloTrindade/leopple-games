import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { LeoppleErrorLogger } from '../../shared/exceptions/leopple.error';
import { LeoppleErrorCode } from '../../shared/exceptions/leopple.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findByEmail(email: string): Promise<Users | null> {
    try {
      return await this.usersRepository.findOne({ where: { email } });
    } catch (error) {
      throw new LeoppleErrorLogger({
        message: 'Erro ao buscar usuário por email.',
        errorCode: LeoppleErrorCode.DATABASE_CONNECTION_ERROR,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async create(userData: Partial<Users>): Promise<Users> {
    try {
      const user = this.usersRepository.create(userData);
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new LeoppleErrorLogger({
        message: 'Erro ao criar usuário.',
        errorCode: LeoppleErrorCode.DATABASE_CONNECTION_ERROR,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
