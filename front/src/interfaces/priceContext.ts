export interface IPriceContext {
  bookingPrice: number[];
  hotelId: string | null;
  setHotelId: React.Dispatch<React.SetStateAction<string | null>>;
  updatePrice: (index: number, price: number) => void;
  resetPrice: (arr: number[]) => void;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}
