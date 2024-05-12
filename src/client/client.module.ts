import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [ClientService],
  controllers: [ClientController],
  imports: [PrismaModule, UserModule],
  exports: [ClientService],
})
export class ClientModule {}
