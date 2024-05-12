import { Injectable } from '@nestjs/common';
import { CompanyDataService } from 'src/company-data/company-data.service';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SingInAuthDto } from './dto/singIn-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly companyService: CompanyDataService,
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(data: CreateAuthDto) {
    const existUsername = await this.userService.findByUsername(data.username);
    if (existUsername) return 'El username ya está en uso';

    const existEmail = await this.companyService.findByEmail(data.emailCompany);
    if (existEmail) return 'El correo ya está en uso';

    const hash = await bcrypt.hash(data.password, 8);
    return await this.prisma.$transaction(async () => {
      const createUser = await this.userService.createUser({
        username: data.username,
        password: hash,
      });

      await this.companyService.createCompany(data, createUser.id);
    });
  }

  async autenticate(data: SingInAuthDto) {
    const { username, password } = data;

    const user = await this.userService.findByUsername(username);
    if (!user) return 'Credenciales incorrectas';

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return 'Credenciales incorrectas';

    const role = await this.userService.findRoleById(user.id);
    const payload = {
      sub: user.id,
      username: user.username,
      role: role.role.nameRole,
    };

    const jwt = await this.jwt.signAsync(payload);
    return { jwt, user: { username: user.username, role: role.role.nameRole } };
  }
}
