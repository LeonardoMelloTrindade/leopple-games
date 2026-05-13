import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './dto';

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
    const { id, email } = await this.usersService.create({
      ...newUser,
      password: hashedPassword,
    });

    return {
      message: 'Your account has been successfully registered.',
    };
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
  }

  private async getAccessToken(email: string, id: number) {
    const payload = { email, sub: id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
