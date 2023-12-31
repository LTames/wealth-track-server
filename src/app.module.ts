import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { CommonModule } from './common/common.module';
import { JwtModule } from '@nestjs/jwt';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CoreModule,
    CommonModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
