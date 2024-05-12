import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('create')
  async create(@Body() data: any, @Request() req, @Response() res) {
    const { userId, role } = req.user;
    try {
      const accountService = await this.accountService.createAccount(
        userId,
        role,
        data.nameAccount,
      );
      if (accountService === 'No hay datos')
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ error: 'No existe una cuenta de la empresa' });

      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Cuenta receptora creada correctamente' });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
