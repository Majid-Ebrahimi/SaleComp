export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  freeDelivery: boolean;
  score: number;
}

export interface ProductList {
  productList: Product[];
}

export interface GraphicModel {
  id: number;
  brand: string;
  name: string;
  graphics_ram_type: string;
  price: number;
  rating: number;
  reviews: number;
  graphics_ram_size: string;
  gpu_clock_speed: string;
  image_url: string;
  freeDelivery: boolean;
}

export interface GraphicModelList {
  graphicList: GraphicModel[];
}
