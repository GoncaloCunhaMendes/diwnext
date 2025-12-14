export interface Rating {
  rate: number;
  count: number;
}

export interface Produto {
  id: number;
  title: string;
  price: string; 
  description: string;
  category: string;
  image: string; 
  rating?: Rating;
}

export interface Categoria {
    name: string;
}