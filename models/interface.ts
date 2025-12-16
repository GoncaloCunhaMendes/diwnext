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

export interface Paises {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  area: number;
  population: number;
}
