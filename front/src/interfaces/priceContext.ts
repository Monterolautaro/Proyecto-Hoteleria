export interface IPriceContext {
  bookingPrice: number[];
  updatePrice: (index: number, price: number) => void;
  resetPrice: (arr: number[]) => void;
}
