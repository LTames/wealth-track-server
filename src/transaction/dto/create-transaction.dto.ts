import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

type TransactionType = 'SAIDA' | 'ENTRADA';

export class CreateTransactionDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn(['SAIDA', 'ENTRADA'])
  transactionType: TransactionType;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
