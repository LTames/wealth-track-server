import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() loginDTO: LoginDTO) {
    return this.authService.loginUser(loginDTO);
  }

  @Post('register')
  public register(@Body() registerDTO: RegisterDTO) {
    return this.authService.registerUser(registerDTO);
  }

  @Get('register')
  public isAlreadyRegistered(
    @Query('email') email?: string,
    @Query('username') username?: string,
  ) {
    return this.authService.isFieldAlreadyRegistered({ email, username });
  }
}
