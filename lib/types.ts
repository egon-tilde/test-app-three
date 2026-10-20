export type Product = {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: string;
  inStock: boolean;
};

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  qty: number;
};

export type Cart = {
  items: CartItem[];
  total: number;
};

export type ContactRequest = {
  name: string;
  email: string;
  message: string;
};

export type ContactResponse = {
  ok: boolean;
  ticket: string;
};
