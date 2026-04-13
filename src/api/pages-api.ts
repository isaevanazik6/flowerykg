import type { StaticPage } from "@/types/StaticPage";
import type { HomePage } from "@/types/HomePage";
import { httpGet } from "@/api/https.ts";

export function fetchHomePage(): Promise<HomePage> {
  return httpGet<HomePage>("/api/home");
}

export function fetchAboutPage(): Promise<StaticPage> {
  return httpGet<StaticPage>("/api/about");
}

export function fetchDeliveryPage(): Promise<StaticPage> {
  return httpGet<StaticPage>("/api/delivery");
}

export function fetchContactsPage(): Promise<StaticPage> {
  return httpGet<StaticPage>("/api/contacts");
}
