
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  total: number;
  date: string;
}
