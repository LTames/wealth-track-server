import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {}
