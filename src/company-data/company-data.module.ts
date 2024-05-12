import { Module } from '@nestjs/common';
import { CompanyDataService } from './company-data.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CompanyDataService],
  imports: [PrismaModule],
  exports: [CompanyDataService],
})
export class CompanyDataModule {}
