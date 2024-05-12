import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  nameClient: string;

  @IsNotEmpty()
  @IsString()
  addressClient: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneClient: string;

  @IsNotEmpty()
  @IsEmail()
  emailClient: string;
}
