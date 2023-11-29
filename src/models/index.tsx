export interface Product {
  image_url: string;
  rating: number;
  random_key: string;
  name1: string;
  name2: string;
  more_info_url: string;
  web_client_absolute_url: string;
  price: number;
  price_text: string;
  price_text_mode: string;
  shop_text: string;
  stock_status: string;
  delivery_city_name?: string | null;
  delivery_city_flag?: string | null;
  image_count: number;
  isFreeDelivery: boolean;
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

export interface CpuModel {
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

export interface DataList {
  ramList: Product[];
  cpuList: Product[];
  graphicList: Product[];
  mainBoardList: Product[];
}
