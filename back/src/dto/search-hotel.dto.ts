import { ApiProperty } from "@nestjs/swagger";

export class SearchHotelDto {
  @ApiProperty({
    description: 'Hotel id to be searched in the database',
    example: 'an UUID value like 0a1b2c3d-4e5f-6g7h-8i9j-0k1l2m3n4o5p',
  })
  hotel_id: string;

  @ApiProperty({
    description: 'Hotel name of the hotel searched',
    example: 'Hilton garden Inn',
  })
  name: string;

  @ApiProperty({
    description: 'An object with the address of the hotel searched',
    example: '{ city: "San Francisco", country: "United States", street: "123 Main St" }',
  })
  address: {
    city: string;
    country: string;
    street: string;
  };
  @ApiProperty({
    description: 'An object with the amenities of the hotel searched',
    example: '{pool,gym,spa,restaurant,bar}',
  })
  amenities: {
    pool: boolean;
    gym: boolean;
    spa: boolean;
    restaurant: boolean;
    bar: boolean;
  };
  @ApiProperty({
    description: 'An object with the availability of the hotel searched',
    example: '{ available: true, totalRoomsLeft: 10 }',
  })
  availability: {
    available: boolean;
    totalRoomsLeft: number;
  };
  @ApiProperty({
    description: 'An array with the rooms of the hotel searched',
    example: [
      {
        room_id: 'an UUID value like 0a1b2c3d-4e5f-6g7h-8i9j-0k1l2m3n4o5p',
        type: 'single',
        room_type: {
          room_type_id: 'an UUID value like 0a1b2c3d-4e5f-6g7h-8i9j-0k1l2m3n4o5p',
          price: 100,
          currency: 'USD',
          rooms_left: 10,
          description: 'A single room',
        },
      },
    ],
  })
  room: Array<{
    room_id: string;
    type: string;
    room_type: {
      room_type_id: string;
      price: number;
      currency: string;
      rooms_left: number;
      description: string;
    };
  }>;

  @ApiProperty({
    description: 'An object with the details of the hotel searched',
    example: '{ stars: 5, rating: 4.5, imgUrl: "https://example.com/hotel.jpg", description: "A great hotel" }',
  })
  details: {
    stars: number;
    rating: number;
    imgUrl: string;
    description: string;
  };
}
