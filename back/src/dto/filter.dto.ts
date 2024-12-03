import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';



export class FiltersDto {
  @IsOptional()
  @ApiProperty({
    description: 'City to be filtered',
    example: 'San Francisco'
  })
  city: string;

  @IsOptional()
  @ApiProperty({
    description: 'Country to be filtered',
    example: 'United States'
  })
  country: string;

  @IsOptional()
  @ApiProperty({
    description: 'Price of the room to be filtered',
    example: '100'
  })
  price: string;

  @IsOptional()
  @ApiProperty({
    description: 'List of amenities to be filtered',
    example: 'pool,gym,spa,restaurant,bar'
  })
  amenities: string;
}
