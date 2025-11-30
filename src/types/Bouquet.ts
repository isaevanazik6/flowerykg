export interface Bouquet {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  categoryId: number;
  tags: string[];
  colorPalette: string[];
  size: "small" | "medium" | "large";
  isPopular: boolean;
  image: string;
  gallery?: string[];
}
