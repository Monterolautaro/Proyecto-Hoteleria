export interface IHotel{ 
id: number;
name: string;
details: {
    stars: number;
    rating: number;
    imgUrl: string;
    description: string;
};
address: {
    city: string;
    country: string;
    street: string;
};
/* availability: {
    available: boolean;
    totalRoomsLeft: number;
}; */
/* rooms: {
    single: RoomDetails;
    double: RoomDetails;
    triple: RoomDetails;
    suite: RoomDetails;
}; */
/* amenities: {
    pool: boolean;
    spa: boolean;
    gym: boolean;
    restaurant: boolean;
    bar: boolean;
}; */
}
