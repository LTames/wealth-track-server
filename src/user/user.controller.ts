import {
  Body,
  Controller,
  Get,
  Patch,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { updateUserPasswordDTO } from './dto/update-user-password.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@ApiTags('User')
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  public getUser(@Req() req) {
    return this.userService.findUserByUniqueField({
      id: req.user.id,
    });
  }

  @Put('/')
  public updateUser(@Body() updateUserDTO: UpdateUserDTO, @Req() request) {
    return this.userService.updateUser(updateUserDTO, request.user.id);
  }

  @Patch('/password')
  public updateUserPassword(
    @Body()
    updateUserPasswordDTO: updateUserPasswordDTO,
    @Req() request,
  ) {
    console.log(updateUserPasswordDTO);
    return this.userService.updateUserPassword(
      updateUserPasswordDTO,
      request.user.id,
    );
  }
}
