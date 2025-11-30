export const ROUTE_PATHS = {
  HOME: "/",
  CATALOG: "/catalog",
  ABOUT: "/about",
  DELIVERY: "/delivery",
  CONTACTS: "/contacts",
  FAVORITES: "/favorites",
  CART: "/cart",

  BOUQUET: (id: number | string) => `/bouquet/${id}`,
};
