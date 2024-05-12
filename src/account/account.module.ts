import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [AccountService],
  controllers: [AccountController],
  imports: [PrismaModule, UserModule],
  exports: [AccountService],
})
export class AccountModule {}
