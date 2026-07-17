import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private users = new Map<string, string>(); // username -> hashedPassword

  constructor(private readonly jwtService: JwtService) {}

  async register(username: string, password: string) {
    if (this.users.has(username)) {
      throw new UnauthorizedException('User already exists');
    }

    const hash = await bcrypt.hash(password, 10);
    this.users.set(username, hash);

    return { status: 'registered', username };
  }

  async validateUser(username: string, password: string) {
    const hash = this.users.get(username);
    if (!hash) return null;

    const match = await bcrypt.compare(password, hash);
    if (!match) return null;

    return { username };
  }

  async login(username: string) {
    const payload = { sub: username };
    const token = await this.jwtService.signAsync(payload);

    return {
      status: 'logged_in',
      accessToken: token,
    };
  }
}