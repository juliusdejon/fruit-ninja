export interface Fruit {
  name: string;
  id: number;
  family: string;
  order: string;
  genus: string;
  nutritions: Nutritions;
}

export interface GroupedFruits {
  category: string;
  fruits: Fruit[];
}

export interface Nutritions {
  calories: number;
  fat: number;
  sugar: number;
  carbohydrates: number;
  protein: number;
}

export enum GroupBy {
  None = "None",
  Family = "Family",
  Order = "Order",
  Genus = "Genus",
}

export enum ViewBy {
  Table = "Table",
  List = "List",
}
