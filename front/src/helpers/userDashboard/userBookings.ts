export const userBookings = [
  {
    hotel: "Test Hotel",
    startDate: "03/11/2024",
    endDate: "04/11/2024",
    nights: 4,
    rooms: [
      { type: "Single", rooms: 4 },
      { type: "Double", rooms: 3 },
      { type: "Triple", rooms: 1 },
    ],
    travelers: 6,
    status: false,
  },
  {
    hotel: "Test Hotel",
    startDate: "03/11/2024",
    endDate: "04/11/2024",
    nights: 4,
    rooms: [
      { type: "Single", rooms: 4 },
      { type: "Double", rooms: 3 },
      { type: "Triple", rooms: 1 },
    ],
    travelers: 6,
    status: true,
  },
  {
    hotel: "Test Hotel",
    startDate: "03/11/2024",
    endDate: "04/11/2024",
    nights: 4,
    rooms: [
      { type: "Single", rooms: 4 },
      { type: "Double", rooms: 3 },
      { type: "Triple", rooms: 1 },
    ],
    travelers: 6,
    status: true,
  },
  {
    hotel: "Test Hotel",
    startDate: "03/11/2024",
    endDate: "04/11/2024",
    nights: 4,
    rooms: [
      { type: "Single", rooms: 4 },
      { type: "Double", rooms: 3 },
      { type: "Triple", rooms: 1 },
    ],
    travelers: 6,
    status: false,
  },
  {
    hotel: "Test Hotel",
    startDate: "03/11/2024",
    endDate: "04/11/2024",
    nights: 4,
    rooms: [
      { type: "Single", rooms: 4 },
      { type: "Double", rooms: 3 },
      { type: "Triple", rooms: 1 },
    ],
    travelers: 6,
    status: true,
  },
  {
    hotel: "Test Hotel",
    startDate: "03/11/2024",
    endDate: "04/11/2024",
    nights: 4,
    rooms: [
      { type: "Single", rooms: 4 },
      { type: "Double", rooms: 3 },
      { type: "Triple", rooms: 1 },
    ],
    travelers: 6,
    status: true,
  },
  {
    hotel: "Test Hotel",
    startDate: "03/11/2024",
    endDate: "04/11/2024",
    nights: 4,
    rooms: [
      { type: "Single", rooms: 4 },
      { type: "Double", rooms: 3 },
      { type: "Triple", rooms: 1 },
    ],
    travelers: 6,
    status: true,
  },
  {
    hotel: "Test Hotel",
    startDate: "03/11/2024",
    endDate: "04/11/2024",
    nights: 4,
    rooms: [
      { type: "Single", rooms: 4 },
      { type: "Double", rooms: 3 },
      { type: "Triple", rooms: 1 },
    ],
    travelers: 6,
    status: false,
  },
  {
    hotel: "Test Hotel",
    startDate: "03/11/2024",
    endDate: "04/11/2024",
    nights: 4,
    rooms: [
      { type: "Single", rooms: 4 },
      { type: "Double", rooms: 3 },
      { type: "Triple", rooms: 1 },
    ],
    travelers: 6,
    status: true,
  },
  {
    hotel: "Test Hotel",
    startDate: "03/11/2024",
    endDate: "04/11/2024",
    nights: 4,
    rooms: [
      { type: "Single", rooms: 4 },
      { type: "Double", rooms: 3 },
      { type: "Triple", rooms: 1 },
    ],
    travelers: 6,
    status: true,
  },
  {
    hotel: "Test Hotel",
    startDate: "03/11/2024",
    endDate: "04/11/2024",
    nights: 4,
    rooms: [
      { type: "Single", rooms: 4 },
      { type: "Double", rooms: 3 },
      { type: "Triple", rooms: 1 },
    ],
    travelers: 6,
    status: true,
  },
];

export interface IUserBookings {
  hotel: string;
  startDate: string;
  endDate: string;
  nights: number;
  rooms: IRoomsTest[];
  travelers: number;
  status: boolean;
}

interface IRoomsTest {
  type: string;
  rooms: number;
}

// booked_rooms
// :
// {booked_rooms_id: 'd53e524c-ed09-4e31-8e56-32721abbbfcf', single_room_id: null, double_room_id: 'c573c471-47f1-4ca8-bfc6-8a69519142cc', triple_room_id: null, suite_room_id: null}
// booking_id
// :
// "2b9ae8b7-2612-422c-ad81-cf73eecb15db"
// end_date
// :
// "2024-12-13"
// hotel
// :
// null
// payments_details
// :
// null
// start_date
// :
// "2024-12-04"
