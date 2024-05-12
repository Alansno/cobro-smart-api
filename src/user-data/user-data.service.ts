import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserDataService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(id: number) {
    try {
      return await this.prisma.userData.findFirst({
        where: {
          userId: id,
        },
        select: {
          id: true,
          companyId: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getDataUser(id: number) {
    try {
      return await this.prisma.user.findFirst({
        where: {
          id: id,
        },
        select: {
          username: true,
          userData: {
            select: {
              emailUser: true,
              phoneUser: true,
              company: {
                select: {
                  nameCompany: true,
                },
              },
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
