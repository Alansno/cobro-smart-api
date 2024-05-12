import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServicesDto } from './dto/create-services.dto';
import { ClientService } from 'src/client/client.service';
import { UserService } from 'src/user/user.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clientService: ClientService,
    private readonly userService: UserService,
  ) {}

  async createService(userId: number, role: string, data: CreateServicesDto) {
    const { id, subtotalService, ivaService } = data;

    const adminOrUser = await this.userService.isAdminOrUser(userId, role);
    if (adminOrUser === 'No hay datos') return 'No hay datos';

    const client = await this.clientService.findClient(
      id,
      adminOrUser.companyId,
    );
    if (!client) return 'No existe el cliente';

    const total = subtotalService + subtotalService * ivaService;

    return await this.prisma.service.create({
      data: {
        typeDocument: data.typeDocument,
        dateInvoicing: new Date(data.dateInvoicing).toISOString(),
        subtotalService: data.subtotalService,
        ivaService: data.ivaService,
        totalService: new Prisma.Decimal(total),
        description: data.description,
        typeService: data.typeService,
        unitBusiness: data.unitBusiness,
        difference: new Prisma.Decimal(total),
        client: {
          connect: {
            id: client.id,
          },
        },
      },
    });
  }

  async findServiceClient(idService: number) {
    try {
      return await this.prisma.service.findFirst({
        where: {
          id: idService,
        },
        select: {
          id: true,
          totalService: true,
          difference: true,
          status: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async updateDifference(
    serviceDifference: any,
    totalRegis: number,
    serviceId: number,
  ) {
    const difference = serviceDifference - totalRegis;
    try {
      await this.prisma.service.update({
        where: {
          id: serviceId,
        },
        data: {
          difference,
          status: difference === 0 ? 'Pagado' : 'Sin pago',
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async servicesClient(userId: number, role: string, clientId: number) {
    try {
      const adminOrUser = await this.userService.isAdminOrUser(userId, role);
      if (adminOrUser === 'No hay datos') return 'No hay datos';

      return await this.prisma.client.findMany({
        where: {
          id: clientId,
          AND: [
            {
              companyId: adminOrUser.companyId,
            },
          ],
        },
        select: {
          id: true,
          nameClient: true,
          emailClient: true,
          createdAt: true,
          addressClient: true,
          phoneClient: true,
          services: {
            select: {
              id: true,
              typeService: true,
              totalService: true,
              difference: true,
              status: true,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async recordsService(serviceId: number) {
    try {
      return await this.prisma.registrationService.findMany({
        where: {
          serviceId: serviceId,
        },
        select: {
          id: true,
          datePayment: true,
          totalRegis: true,
          payment: true,
          nameAccount: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findServiceById(serviceId: number) {
    try {
      return await this.prisma.service.findUnique({
        where: {
          id: serviceId,
        },
        select: {
          id: true,
          typeService: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async allServices(userId: number, role: string) {
    try {
      const adminOrUser = await this.userService.isAdminOrUser(userId, role);
      if (adminOrUser === 'No hay datos') return 'No hay datos';

      return await this.prisma.service.findMany({
        where: {
          client: {
            companyId: adminOrUser.companyId,
          },
        },
        select: {
          id: true,
          dateInvoicing: true,
          typeService: true,
          status: true,
          client: {
            select: {
              nameClient: true,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
