export interface Category {
  id: number;
  name: string;
  description?: string;
  sortOrder: number;
  isVisibleOnHome: boolean;
}
