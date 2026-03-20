import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { UserDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.password) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(user: UserDto) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: RegisterDto) {
    const userExists = await this.usersService.findByEmail(userData.email);

    if (userExists) {
      throw new UnauthorizedException('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });

    return this.login(newUser);
  }
}
