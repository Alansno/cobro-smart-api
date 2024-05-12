import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRegistrationServiceDto } from './dto/create-registration-service.dto';
import { UserService } from 'src/user/user.service';
import { AccountService } from 'src/account/account.service';
import { ServicesService } from 'src/services/services.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RegistrationServiceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly accountService: AccountService,
    private readonly services: ServicesService,
  ) {}

  async createRegistration(
    userId: number,
    role: string,
    data: CreateRegistrationServiceDto,
  ) {
    const { id, nameAccount, subtotalRegis, ivaRegis } = data;
    try {
      const adminOrUser = await this.userService.isAdminOrUser(userId, role);
      if (adminOrUser === 'No hay datos') return 'No hay datos';

      const account = await this.accountService.findAccount(
        nameAccount,
        adminOrUser.companyId,
      );
      if (!account) return 'No existe la cuenta receptora';

      const service = await this.services.findServiceClient(id);
      if (!service) return 'No existe el servicio';

      const total = subtotalRegis + subtotalRegis * ivaRegis;
      let diff;

      const totalDecimal = new Prisma.Decimal(total);

      if (
        totalDecimal.greaterThanOrEqualTo(0) &&
        totalDecimal.lessThanOrEqualTo(service.difference) &&
        service.status === 'Sin pago'
      ) {
        diff = await this.prisma.registrationService.create({
          data: {
            subtotalRegis: data.subtotalRegis,
            ivaRegis: data.ivaRegis,
            totalRegis: totalDecimal,
            payment: data.payment,
            typeIncome: data.typeIncome,
            wallet: data.wallet,
            comments: data.comments,
            account: {
              connect: {
                nameAccount: account.nameAccount,
              },
            },
            service: {
              connect: {
                id: service.id,
              },
            },
          },
        });
      } else if (service.status === 'Pagado') {
        return 'Ya has saldado el servicio';
      } else {
        return 'No puedes pagar más/menos de lo que debes';
      }

      await this.services.updateDifference(
        service.difference,
        diff.totalRegis,
        service.id,
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
