import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsString } from 'class-validator';

export class DeleteTransactionsDTO {
  @ApiProperty()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ids: string[];
}
