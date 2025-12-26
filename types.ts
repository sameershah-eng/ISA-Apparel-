
export type Category = 'Dress Pant' | 'Active Waist Dress Pant' | 'Cotton Pant' | 'Chino Pant' | 'Accessories' | 'Bespoke' | 'All';

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: number;
  description: string;
  longDescription: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}
