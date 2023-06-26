import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTransactionDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  transactionType: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  value: number;
}
