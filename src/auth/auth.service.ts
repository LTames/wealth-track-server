import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma/prisma.service';
import { RegisterDTO } from './dto/register.dto';
import { Prisma } from '@prisma/client';
import { UserAlreadyExistsException } from '../common/exceptions/userAlreadyExistsException';
import { genSalt, hash, compare } from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  public async registerUser(registerDTO: RegisterDTO) {
    try {
      const salt = await genSalt();
      registerDTO.password = await hash(registerDTO.password, salt);

      await this.prismaService.user.create({ data: registerDTO });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new UserAlreadyExistsException(e.meta.target as string);
        }
      }
    }
  }

  public async loginUser(loginDTO: LoginDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: loginDTO.username,
      },
    });

    if (!user) throw new NotFoundException();

    if (await compare(loginDTO.password, user.password)) {
      const { password, ...result } = user;
      return { accessToken: await this.jwtService.signAsync(result) };
    }

    throw new UnauthorizedException();
  }

  public async isFieldAlreadyRegistered(
    whereInput: Prisma.UserWhereUniqueInput,
  ) {
    const user = await this.userService.findUserByUniqueField(whereInput);
    return {
      field: whereInput,
      alreadyRegistered: Boolean(user),
    };
  }
}
