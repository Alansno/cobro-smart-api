import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CompanyDataModule } from './company-data/company-data.module';
import { ClientModule } from './client/client.module';
import { UserDataModule } from './user-data/user-data.module';
import { ServicesModule } from './services/services.module';
import { RegistrationServiceModule } from './registration-service/registration-service.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    UserModule,
    CompanyDataModule,
    ClientModule,
    UserDataModule,
    ServicesModule,
    RegistrationServiceModule,
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
