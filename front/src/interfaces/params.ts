export interface IParams {
  params: Promise<{ idHotel: string }>;
}

export interface IParamsPayment {
  params: Promise<{ hotelName: string }>;
}
