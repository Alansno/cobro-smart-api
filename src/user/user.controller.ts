import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Request,
  Response,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('data-user')
  async getDataUser(@Request() req, @Response() res) {
    const { userId, role } = req.user;
    try {
      const data = await this.userService.getDataTypeUser(userId, role);
      if ('companyData' in data) {
        const companyData = data.companyData;
        return res.status(HttpStatus.OK).json({ companyData });
      } else {
        return 'nada';
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
