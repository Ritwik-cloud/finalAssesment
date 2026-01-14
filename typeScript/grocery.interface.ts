export interface Item {
  id: number;
  name: string;
  price: number;
  category: string;
  quantity: number;
}

export interface GroceryState {
  items: Item[];
  history: Item[][];
  coupon: string;
}