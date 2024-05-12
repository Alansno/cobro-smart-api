import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyDataService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prisma.companyData.findFirst({
      where: {
        emailCompany: {
          equals: email,
        },
      },
      select: {
        id: true,
      },
    });
  }

  async createCompany(data, userId: number) {
    try {
      return await this.prisma.companyData.create({
        data: {
          nameCompany: data.nameCompany,
          addressCompany: data.addressCompany,
          rfc: data.rfc,
          emailCompany: data.emailCompany,
          phoneCompany: data.phoneCompany,
          typeIndustry: data.typeIndustry,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Algo salió mal');
    }
  }

  async findById(id: number) {
    return await this.prisma.companyData.findFirst({
      where: {
        userId: id,
      },
      select: {
        id: true,
      },
    });
  }

  async getDataId(id: number) {
    try {
      return await this.prisma.user.findFirst({
        where: {
          id: id,
        },
        select: {
          username: true,
          companyData: {
            select: {
              nameCompany: true,
              emailCompany: true,
              phoneCompany: true,
              addressCompany: true,
              rfc: true,
              typeIndustry: true,
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
