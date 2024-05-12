import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientModule } from 'src/client/client.module';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [ServicesService],
  controllers: [ServicesController],
  imports: [PrismaModule, ClientModule, UserModule],
  exports: [ServicesService],
})
export class ServicesModule {}
