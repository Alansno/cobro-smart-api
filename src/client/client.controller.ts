import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { Roles } from 'src/auth/roles.decorator';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('create')
  @Roles(['Admin', 'Usuario'])
  async create(@Body() data: CreateClientDto, @Request() req, @Response() res) {
    try {
      const { userId, role } = req.user;
      const client = await this.clientService.createClient(userId, role, data);

      if (client === 'Error al agregar un cliente')
        return res.status(HttpStatus.CONFLICT).json({ error: client });

      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Cliente agregado correctamente' });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Get('get-clients')
  @Roles(['Admin', 'Usuario'])
  async getClients(@Request() req, @Response() res) {
    const { userId, role } = req.user;
    try {
      const clients = await this.clientService.getClients(userId, role);
      if (!clients)
        return res
          .status(HttpStatus.NO_CONTENT)
          .json({ message: 'No hay clientes' });

      return res.status(HttpStatus.OK).json({ clients });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
