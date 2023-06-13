import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CoreModule } from 'src/core/core.module';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/core/services/prisma/prisma.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [CoreModule, UserModule],
})
export class AuthModule {}
