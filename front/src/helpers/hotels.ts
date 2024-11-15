import { IHotel } from "@/entities";

const HotelMockup: IHotel[] = [
    {
      id: 1,
      name: "Hotel Buenos Aires",
      details: {
        stars: 4,
        
        imgUrl: "https://osepmendoza.com.ar/web/wp-content/uploads/2018/12/buenos-aires.jpg-1.jpg",
        description: "Hotel elegante en el centro de la ciudad de Buenos Aires.",
      },
      address: {
        city: "Buenos Aires",
        country: "Argentina",
        street: "Tucumán 535, C1049 Buenos Aires",
      },
    },
    {
      id: 2,
      name: "Hotel Cordoba",
      details: {
        stars: 3,
        rating: 4.0,
        imgUrl: "https://www.hotelescenter.es/wp-content/blogs.dir/1601/files/cordoba-center//mobile-cordoba.jpg",
        description: "Agradable hotel con vistas a las sierras",
      },
      address: {
        city: "Cordoba",
        country: "Argentina",
        street: "Avenida de la libertad 4, 14006 Cordoba",
      },
    },
    {
      id: 3,
      name: "Hotel Iguazú",
      details: {
        stars: 5,
        rating: 4.7,
        imgUrl: "https://www.iguazufalls.com.ar/media/hotel.jpg",
        description: "Lujoso hotel rodeado de la belleza natural de las Cataratas del Iguazú.",
      },
      address: {
        city: "Puerto Iguazú",
        country: "Argentina",
        street: "Ruta Nacional 12 km 5, Puerto Iguazú",
      },
    },
    {
      id: 4,
      name: "Hotel Mendoza",
      details: {
        stars: 4,
        
        imgUrl: "https://www.mendozahotel.com/wp-content/uploads/2020/10/hotel-mendoza.jpg",
        description: "Hotel cómodo y moderno en el corazón de Mendoza.",
      },
      address: {
        city: "Mendoza",
        country: "Argentina",
        street: "Avenida España 1210, 5500 Mendoza",
      },
    },
    {
      id: 5,
      name: "Hotel Bariloche",
      details: {
        stars: 3,
        rating: 4.1,
        imgUrl: "https://www.barilochehotel.com/images/exterior.jpg",
        description: "Acogedor hotel con vistas al lago Nahuel Huapi.",
      },
      address: {
        city: "San Carlos de Bariloche",
        country: "Argentina",
        street: "Juan Manuel de Rosas 625, 8400 Bariloche",
      },
    },
    {
      id: 5,
      name: "Hotel Bariloche",
      details: {
        stars: 3,
        
        imgUrl: "https://www.barilochehotel.com/images/exterior.jpg",
        description: "Acogedor hotel con vistas al lago Nahuel Huapi.",
      },
      address: {
        city: "San Carlos de Bariloche",
        country: "Argentina",
        street: "Juan Manuel de Rosas 625, 8400 Bariloche",
      },
    },
    {
      id: 5,
      name: "Hotel Bariloche",
      details: {
        stars: 3,
        rating: 4.1,
        imgUrl: "https://www.barilochehotel.com/images/exterior.jpg",
        description: "Acogedor hotel con vistas al lago Nahuel Huapi.",
      },
      address: {
        city: "San Carlos de Bariloche",
        country: "Argentina",
        street: "Juan Manuel de Rosas 625, 8400 Bariloche",
      },
    }
  ]
    
  export default HotelMockup;