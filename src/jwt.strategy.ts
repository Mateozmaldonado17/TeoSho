import { PassportStrategy } from '@nestjs/passport';
import { ITokenPayload } from 'inteface';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'i-am-think-that-i-am-the-right-person-for-this-position',
    });
  }

  validate(payload: any): ITokenPayload {
    return { id: payload.id, email: payload.email };
  }
}
