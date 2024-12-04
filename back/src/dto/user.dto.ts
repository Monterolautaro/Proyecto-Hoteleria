import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of the user to be created',
    example: 'John',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Last name of the user to be created',
    example: 'Doe',
  })
  lastname: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Birthday of the user to be created',
    example: '1990-01-01',
  })
  birthday: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email of the user to be created',
    example: 'j0A2y@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Username of the user to be created',
    example: 'johndoe',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @ApiProperty({
    description: 'Password of the user to be created with one uppercase letter, one lowercase letter, one number, and one special character',
    example: 'Password123!',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @ApiProperty({
    description: 'Repeat the password of the user',
    example: 'the same as password'
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).',
  })
  confirmPassword: string;
}
