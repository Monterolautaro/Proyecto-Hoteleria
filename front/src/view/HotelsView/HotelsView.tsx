import HotelCard from '@/components/cards/HotelCard'
import getHotels from '@/helpers/hotels'
import React from 'react'

/* interface HotelCardProps {
  id: string; // ID del hotel
  image: string;
  name: string;
  location: string;
  rating?: number;
  stars?: number;
  price: number; // Aseguramos que el precio sea un número
  label?: string; // Para el "NEW" o etiquetas
} */

const HotelsView = async () => {
  const hotels = await getHotels(1,5)
  return (
    <div>
      {hotels && hotels.map((hotel, key) => {return  <HotelCard key={key} id={hotel.hotel_id} image={hotel.details.imgUrl} name={hotel.name} location={hotel.address.country} price={parseInt(hotel.room[0].room_type.price)} />})}
    </div>
  )
}

export default HotelsView
