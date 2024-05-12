import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createAccount(userId: number, role: string, nameAccount: string) {
    try {
      const adminOrUser = await this.userService.isAdminOrUser(userId, role);
      if (adminOrUser === 'No hay datos') return 'No hay datos';

      return await this.prisma.account.create({
        data: {
          nameAccount: nameAccount,
          company: {
            connect: {
              id: adminOrUser.companyId,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findAccount(nameAccount: string, companyId: number) {
    try {
      return await this.prisma.account.findFirst({
        where: {
          nameAccount: nameAccount,
          AND: [
            {
              companyId: {
                equals: companyId,
              },
            },
          ],
        },
        select: {
          nameAccount: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
