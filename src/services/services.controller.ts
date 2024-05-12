import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServicesDto } from './dto/create-services.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly services: ServicesService) {}

  @Post('create')
  async create(
    @Body() data: CreateServicesDto,
    @Request() req,
    @Response() res,
  ) {
    try {
      const { userId, role } = req.user;
      const service = await this.services.createService(userId, role, data);

      if (service === 'No existe el cliente' || service === 'No hay datos')
        return res.status(HttpStatus.NOT_FOUND).json({ error: service });

      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Servicio creado correctamente' });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Get('services-client/:id')
  async getServicesClient(
    @Param('id') id: number,
    @Request() req,
    @Response() res,
  ) {
    const { userId, role } = req.user;
    try {
      const servicesClient = await this.services.servicesClient(
        userId,
        role,
        id,
      );
      if (servicesClient.length === 0 || servicesClient === 'No hay datos')
        return res.status(HttpStatus.NOT_FOUND).json({
          error: servicesClient,
        });

      return res.status(HttpStatus.OK).json({ message: servicesClient });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Get('records-service/:id')
  async getRecordsService(@Param('id') id: number, @Response() res) {
    try {
      const recordsService = await this.services.recordsService(id);

      if (!recordsService)
        return res.status(HttpStatus.NOT_FOUND).json({
          error: 'No se encontraron registros de este servicio',
        });

      return res.status(HttpStatus.OK).json({ message: recordsService });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Get('get-service/:id')
  async getServiceById(@Param('id') id: number, @Response() res) {
    try {
      const service = await this.services.findServiceById(id);
      if (!service)
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ error: 'No se encontró el servicio' });

      return res.status(HttpStatus.OK).json({ message: service });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Get('all-services')
  async getAllServices(@Request() req, @Response() res) {
    const { userId, role } = req.user;
    try {
      const services = await this.services.allServices(userId, role);

      if (!services)
        return res
          .status(HttpStatus.OK)
          .json({ error: 'No se encontraron servicios' });

      return res.status(HttpStatus.OK).json({ message: services });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
