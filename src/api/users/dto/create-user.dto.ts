import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsDefined()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  username: string;
}
