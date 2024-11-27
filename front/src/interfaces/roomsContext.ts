export interface IRoomsContext {
  bookingRooms: number[];
  updateRooms: (index: number, rooms: number) => void;
  resetRooms: (arr: number[]) => void;
}
