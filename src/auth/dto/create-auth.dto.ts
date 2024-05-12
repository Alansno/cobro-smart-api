import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  nameCompany: string;

  @IsString()
  @IsNotEmpty()
  addressCompany: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  @MaxLength(14)
  rfc: string;

  @IsEmail()
  @IsNotEmpty()
  emailCompany: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phoneCompany: string;

  @IsString()
  @IsNotEmpty()
  typeIndustry: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
