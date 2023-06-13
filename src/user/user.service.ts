import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/services/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public findUserByUniqueField(whereInput: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({
      where: whereInput,
    });
  }
}
