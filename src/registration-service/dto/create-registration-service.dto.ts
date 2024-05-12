import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRegistrationServiceDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  subtotalRegis: number;

  @IsNotEmpty()
  @IsNumber()
  ivaRegis: number;

  @IsNotEmpty()
  @IsString()
  payment: string;

  @IsNotEmpty()
  @IsString()
  typeIncome: string;

  @IsNotEmpty()
  @IsString()
  wallet: string;

  @IsNotEmpty()
  @IsString()
  comments: string;

  @IsNotEmpty()
  @IsString()
  nameAccount: string;
}
