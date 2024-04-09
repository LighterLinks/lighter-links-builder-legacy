import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  async readUser(@Param('userId') userId: string) {
    return this.userService.readUser(userId);
  }

  @Post('create')
  async createUser(@Body('userData') userData: User) {
    return this.userService.createUser(userData);
  }

  @Post('delete')
  async deleteUser(@Body('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Post('update')
  async updateUser(@Body('userData') userData: User) {
    return this.userService.updateUser(userData);
  }
}
