import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  public getUserData(@Req() req) {
    return this.userService.findUserByUniqueField({
      id: req.user.id,
    });
  }
}
