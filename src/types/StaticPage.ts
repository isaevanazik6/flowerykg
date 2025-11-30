export interface StaticPageSection {
  title?: string;
  text?: string;
  image?: string;
}

export interface StaticPage {
  sections: StaticPageSection[];
}
