import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

interface IJwtPayload {
  email: string;
  sub: number;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_SECRET || 'chave-muito-secreta-em-desenvolvimento',
    });
  }

  async validate(payload: IJwtPayload) {
    return { id: payload.sub, email: payload.email };
  }
}
