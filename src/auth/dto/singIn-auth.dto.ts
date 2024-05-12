import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SingInAuthDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
