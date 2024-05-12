import {
  IsISO8601,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateServicesDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  typeDocument: string;

  @IsNotEmpty()
  @IsISO8601({ strict: true })
  dateInvoicing: string;

  @IsNotEmpty()
  @IsNumber()
  subtotalService: number;

  @IsNotEmpty()
  @IsNumber()
  ivaService: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  typeService: string;

  @IsNotEmpty()
  @IsString()
  unitBusiness: string;
}
