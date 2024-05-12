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
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SingInAuthDto } from './dto/singIn-auth.dto';
import { Public } from './public.decorator';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sing-up')
  async registerUser(@Body() data: CreateAuthDto, @Response() res) {
    try {
      const auth = await this.authService.register(data);
      if (
        auth === 'El username ya está en uso' ||
        auth === 'El correo ya está en uso'
      )
        return res.status(HttpStatus.OK).json({ alert: auth });

      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Usuario creado correctamente' });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Algo salio jodido');
    }
  }

  @Public()
  @Post('sing-in')
  async autenticateUser(@Body() data: SingInAuthDto, @Response() res) {
    try {
      const isAuth = await this.authService.autenticate(data);

      if (isAuth === 'Credenciales incorrectas')
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: isAuth });

      return res.status(HttpStatus.OK).json({ message: isAuth });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Algo salio mal');
    }
  }

  @Roles(['Admin'])
  @Get('pene')
  async protectedPoint(@Request() req) {
    try {
      return req.user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
