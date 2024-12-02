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
