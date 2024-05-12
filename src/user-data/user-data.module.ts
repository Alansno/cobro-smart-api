import { Module } from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [UserDataService],
  imports: [PrismaModule],
  exports: [UserDataService],
})
export class UserDataModule {}
