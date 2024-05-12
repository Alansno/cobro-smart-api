import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import { RegistrationServiceService } from './registration-service.service';
import { CreateRegistrationServiceDto } from './dto/create-registration-service.dto';

@Controller('registration-service')
export class RegistrationServiceController {
  constructor(
    private readonly registrationService: RegistrationServiceService,
  ) {}

  @Post('create')
  async create(
    @Body() data: CreateRegistrationServiceDto,
    @Request() req,
    @Response() res,
  ) {
    const { userId, role } = req.user;
    try {
      const registration = await this.registrationService.createRegistration(
        userId,
        role,
        data,
      );

      if (
        registration === 'No existe el servicio' ||
        registration === 'No existe la cuenta receptora' ||
        registration === 'No hay datos'
      )
        return res.status(HttpStatus.NOT_FOUND).json({ error: registration });

      if (
        registration === 'Ya has saldado el servicio' ||
        registration === 'No puedes pagar más/menos de lo que debes'
      )
        return res.status(HttpStatus.OK).json({ alert: registration });

      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Pago de servicio realizado correctamente' });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
