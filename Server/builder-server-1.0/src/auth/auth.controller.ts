import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './auth.decorator';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const result = await this.authService.validateUser(email, password);
    if (!result) {
      return {
        status: 401,
        message: 'Password is incorrect',
      };
    }

    const accessToken = await this.authService.getAccessToken(result);
    const refreshToken = await this.authService.getRefreshToken(result);

    await this.userService.updateUserRefreshToken(result.id, refreshToken);

    return {
      status: 200,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  @Public()
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    try {
      const newAccessToken = (await this.authService.refresh(refreshToken))
        .accessToken;
      return {
        status: 200,
        accessToken: newAccessToken,
      };
    } catch (error) {
      return {
        status: 401,
        message: error.message,
      };
    }
  }

  @Public()
  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.readUserByEmail(email);
    if (user) {
      return {
        status: 401,
        message: 'Email already exists',
      };
    }
    const result = await this.userService.createUser({
      id: '',
      name,
      email,
      password,
      bio: '',
      avatarURL: '',
      createdAt: new Date().toISOString(),
    });
    return {
      status: 200,
      message: 'User created successfully',
      data: result,
    };
  }

  @Public()
  @Post('logout')
  async logout(@Body('refreshToken') refreshToken: string) {
    const result = await this.userService.readUserByRefreshToken(refreshToken);
    if (!result) {
      return {
        status: 401,
        message: 'Invalid refresh token',
      };
    }
    await this.userService.updateUserRefreshToken(result.id, '');
    return {
      status: 200,
      message: 'Logout successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
