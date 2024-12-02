export interface UserBookings {
    hotel: string;
    startDate: string;
    endDate: string;
    nights: number;
    rooms: RoomsTest[];
    travelers: number;
    status: boolean;
  }
  
  interface RoomsTest {
    type: string;
    rooms: number;
  }
  