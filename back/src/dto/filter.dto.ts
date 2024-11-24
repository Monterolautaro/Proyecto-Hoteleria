import { IsOptional } from "class-validator";



export class FiltersDto {
    @IsOptional()
    city: string;

    @IsOptional()
    country: string;

    @IsOptional()
    price: string;

    @IsOptional()
    amenities: string;
}