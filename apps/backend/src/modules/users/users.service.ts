import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findByEmail(email: string): Promise<Users | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(userData: Partial<Users>): Promise<Users> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }
}
