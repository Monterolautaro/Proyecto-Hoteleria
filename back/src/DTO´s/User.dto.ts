import {
    IsBoolean,
    IsDate,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  export class CreateUserDto {
    @IsUUID()
    @IsOptional()
    user_id?: string;
  
    @IsString()
    name: string;
  
    @IsString()
    lastname: string;
  
    @IsDate()
    @Type(() => Date)
    birthday: Date;
  
    @IsBoolean()
    @IsOptional()
    isAdmin?: boolean;
  
    @IsNumber()
    @IsOptional()
    total_visits?: number;
  
    @IsNumber()
    @IsOptional()
    average_session_duration?: number;
  }
  