import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CompanyDataService } from 'src/company-data/company-data.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDataService } from 'src/user-data/user-data.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly companyService: CompanyDataService,
    private readonly userDataService: UserDataService,
  ) {}

  async findByUsername(username: string) {
    return await this.prisma.user.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
  }

  async createUser(body) {
    try {
      const { username, password } = body;

      return await this.prisma.user.create({
        data: {
          username: username,
          password: password,
          role: {
            connect: {
              id: 2,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Algo salió mal');
    }
  }

  async findRoleById(id: number) {
    try {
      return await this.prisma.user.findFirst({
        where: {
          id: id,
        },
        select: {
          role: {
            select: {
              id: true,
              nameRole: true,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async isAdminOrUser(id: number, role: string) {
    let data = {};
    try {
      if (role === 'Admin') {
        const admin = await this.companyService.findById(id);
        if (!admin) return 'No hay datos';
        return (data = { companyId: admin.id, userId: null });
      }
      const userData = await this.userDataService.findUserById(id);
      if (!userData) return 'No hay datos';
      return (data = { companyId: userData.companyId, userId: userData.id });
    } catch (error) {
      console.log(error);
    }
  }

  async getDataTypeUser(userId: number, role: string) {
    try {
      if (role === 'Admin') {
        const admin = await this.companyService.getDataId(userId);
        return admin;
      } else {
        const user = await this.userDataService.getDataUser(userId);
        return user;
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
