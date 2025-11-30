import type { StaticPage } from "@/types/StaticPage";
import {httpGet} from "@/api/https.ts";

export function fetchHomePage() {
  return httpGet<any>("/api/home.json");
}

export function fetchAboutPage() {
  return httpGet<StaticPage>("/api/about.json");
}

export function fetchDeliveryPage() {
  return httpGet<StaticPage>("/api/delivery.json");
}

export function fetchContactsPage() {
  return httpGet<StaticPage>("/api/contacts.json");
}
