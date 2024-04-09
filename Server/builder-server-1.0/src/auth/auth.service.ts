import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bycrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.readUserByEmail(email);
    if (user && bycrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async getAccessToken(user: User) {
    return this.jwtService.sign({ id: user.id, email: user.email });
  }

  async getRefreshToken(user: User) {
    return this.jwtService.sign(
      { id: user.id },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_EXPIRATION_TIME',
        ),
      },
    );
  }

  async refresh(refreshToken: string) {
    const decoded = this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });

    const user = await this.userService.readUser(decoded.id);
    if (!user) {
      return {
        status: 401,
        message: 'Invalid refresh token',
      };
    }

    const newAccessToken = await this.getAccessToken(user);

    return {
      status: 200,
      accessToken: newAccessToken,
    };
  }
}
