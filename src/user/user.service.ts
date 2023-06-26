import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/services/prisma/prisma.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdateUserPasswordDTO } from './dto/update-user-password.dto';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findUserByUniqueField(whereInput: Prisma.UserWhereUniqueInput) {
    const { password, ...user } = await this.prismaService.user.findUnique({
      where: whereInput,
    });

    return user;
  }

  public updateUser(updateUserDTO: UpdateUserDTO, userId: string) {
    return this.prismaService.user.update({
      data: updateUserDTO,
      where: { id: userId },
    });
  }

  public updateUserPassword(
    { newPassword }: UpdateUserPasswordDTO,
    userId: string,
  ) {
    const salt = genSaltSync();
    const password = hashSync(newPassword, salt);

    return this.prismaService.user.update({
      data: { password },
      where: { id: userId },
    });
  }
}
