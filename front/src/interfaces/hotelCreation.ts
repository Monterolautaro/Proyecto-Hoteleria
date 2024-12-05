// Definición de la interfaz para los detalles del hotel
interface HotelDetails {
  stars: number;
  rating: number;
  imgUrl: string;
  description: string;
}

// Definición de la interfaz para la dirección del hotel
interface HotelAddress {
  city: string;
  country: string;
  street: string;
}

// Definición de la interfaz para la disponibilidad del hotel
interface HotelAvailability {
  available: boolean;
  totalRoomsLeft: number;
}

// Definición de la interfaz para las habitaciones del hotel
export interface HotelRooms {
  single: RoomDetails;
  double?: RoomDetails;
  triple?: RoomDetails;
  suite?: RoomDetails;
}

// Interfaz para los detalles de una habitación
interface RoomDetails {
  price: number;
  currency: string;
  roomsLeft: number;
  description: string;
}

// Definición de la interfaz para las comodidades del hotel
interface HotelAmenities {
  pool: boolean;
  spa: boolean;
  gym: boolean;
  restaurant: boolean;
  bar: boolean;
}

// Interfaz principal del hotel
export interface IHotelCreation {
  name: string;
  details: HotelDetails;
  address: HotelAddress;
  availability: HotelAvailability;
  rooms: HotelRooms;
  amenities: HotelAmenities;
}
