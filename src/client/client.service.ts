import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ClientService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createClient(userId: number, role: string, data: CreateClientDto) {
    const isAdminOrUser = await this.userService.isAdminOrUser(userId, role);

    if (isAdminOrUser === 'No hay datos') return 'Error al agregar un cliente';

    return await this.prisma.client.create({
      data: {
        nameClient: data.nameClient,
        addressClient: data.addressClient,
        phoneClient: data.phoneClient,
        emailClient: data.emailClient,
        companyId: isAdminOrUser.companyId,
        userId: isAdminOrUser.userId,
      },
    });
  }

  async getClients(userId: number, role: string) {
    const isAdminOrUser = await this.userService.isAdminOrUser(userId, role);

    if (isAdminOrUser === 'No hay datos')
      throw new NotFoundException('Error al cargar cliente');

    return await this.prisma.client.findMany({
      where: {
        companyId: {
          equals: isAdminOrUser.companyId,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        nameClient: true,
      },
    });
  }

  async findClient(clientId: number, companyId: number) {
    try {
      return await this.prisma.client.findFirst({
        where: {
          id: clientId,
          AND: [
            {
              companyId: {
                equals: companyId,
              },
            },
          ],
        },
        select: {
          id: true,
          companyId: true,
          userId: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
