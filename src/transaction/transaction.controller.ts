import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UpdateTransactionDTO } from './dto/update-transaction.dto';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';
import { DeleteTransactionsDTO } from './dto/delete-transactions.dto';

@UseGuards(AuthGuard)
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('')
  public createTransaction(
    @Req() req: any,
    @Body() createTransactionDTO: CreateTransactionDTO,
  ) {
    return this.transactionService.createTransaction(
      req.user.id,
      createTransactionDTO,
    );
  }

  @Get('')
  public getTransactions(@Req() req: any) {
    return this.transactionService.getTransactionsByUserId(req.user.id);
  }

  @Put(':id')
  public updateTransaction(
    @Param('id') id: string,
    @Body() updateTransactionDTO: UpdateTransactionDTO,
  ) {
    return this.transactionService.updateTransaction(id, updateTransactionDTO);
  }

  @Delete('')
  public deleteSelectedTransactions(@Body() { ids }: DeleteTransactionsDTO) {
    return this.transactionService.deleteSelectedTransactions(ids);
  }

  @Delete(':id')
  public deleteTransactionById(@Param('id') id: string) {
    return this.transactionService.deleteTransactionById(id);
  }
}
