import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { CoreModule } from '../core/core.module';

@Module({
  providers: [TransactionService],
  controllers: [TransactionController],
  imports: [CoreModule],
})
export class TransactionModule {}
