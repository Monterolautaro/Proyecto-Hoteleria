export interface IRoomsContext {
  bookingRooms: IBookingRooms[];
  updateRooms: (index: number, rooms: number, id: string, type: string) => void;
  resetRooms: (arr: number[]) => void;
}

export interface IBookingRooms {
  roomId: string;
  type: string;
  rooms: number;
}
