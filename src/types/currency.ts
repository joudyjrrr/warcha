export type CurrencyData = {
  created_at: Date;
  currency: string;
  dollar_price: number;
  id: number;
  updated_at: Date;
};
export type ICurrency = {
  currency: string;
  dollar_price: number;
}