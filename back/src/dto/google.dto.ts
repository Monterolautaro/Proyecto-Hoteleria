import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GoogleAuthDto {

  @IsNotEmpty()
  @ApiProperty({
    description: 'Google token',
    example: '1ibud1y'
  })
  token: string;
}
