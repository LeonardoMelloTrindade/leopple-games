import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './dto';
import { Users } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.getAccessToken(email, user.id);
  }

  async register(newUser: RegisterDto) {
    const userExists = await this.usersService.findByEmail(newUser.email);

    if (userExists) {
      throw new UnauthorizedException('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    await this.usersService.create({ ...newUser, password: hashedPassword });

    return { message: 'Your account has been successfully registered.' };
  }

  async getMe(userId: number) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return this.stripPassword(user);
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    return isMatch ? this.stripPassword(user) : null;
  }

  private stripPassword(user: Users) {
    const { password, avatar, ...rest } = user;
    return rest;
  }

  private async getAccessToken(email: string, id: number) {
    const payload = { email, sub: id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
