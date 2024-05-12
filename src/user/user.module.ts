import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CompanyDataModule } from 'src/company-data/company-data.module';
import { UserDataModule } from 'src/user-data/user-data.module';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  imports: [PrismaModule, CompanyDataModule, UserDataModule],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
