import { Injectable, Post } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma/prisma.service';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}

  public getTransactionsByUserId(userId: string) {
    return this.prismaService.transaction.findMany({
      where: {
        userRefId: userId,
      },
    });
  }

  public updateTransaction(
    id: string,
    updateTransactionDTO: UpdateTransactionDTO,
  ) {
    return this.prismaService.transaction.update({
      where: { id },
      data: updateTransactionDTO,
    });
  }

  public async createTransaction(
    userId: string,
    { category, transactionType, value }: CreateTransactionDTO,
  ) {
    return this.prismaService.transaction.create({
      data: {
        category,
        transactionType,
        value,
        userRefId: userId,
      },
    });
  }

  public deleteTransactionById(id: string) {
    return this.prismaService.transaction.delete({ where: { id } });
  }

  public async deleteSelectedTransactions(idsToDelete: string[]) {
    return this.prismaService.transaction.deleteMany({
      where: { id: { in: idsToDelete } },
    });
  }
}
