export interface IParams {
  params: Promise<{ idHotel: string }>;
}

export interface IParamsPayment {
  params: Promise<{ hotelName: string }>;
}

export interface IParamsUser {
  params: Promise<{ idUser: string }>;
}