import { Module } from '@nestjs/common';
import { RegistrationServiceService } from './registration-service.service';
import { RegistrationServiceController } from './registration-service.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AccountModule } from 'src/account/account.module';
import { UserModule } from 'src/user/user.module';
import { ServicesModule } from 'src/services/services.module';

@Module({
  providers: [RegistrationServiceService],
  controllers: [RegistrationServiceController],
  imports: [PrismaModule, AccountModule, UserModule, ServicesModule],
})
export class RegistrationServiceModule {}
