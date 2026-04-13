export interface HomeHero {
  title: string;
  subtitle: string;
  buttonText: string;
  routeTo: string;
  images: string[];
}

export interface WhyUsItem {
  title: string;
  description: string;
  icon?: string;
}

export interface HomePage {
  hero: HomeHero;
  whyUs: WhyUsItem[];
}
