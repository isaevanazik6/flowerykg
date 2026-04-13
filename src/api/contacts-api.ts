import { httpGet } from "@/api/https.ts";
import type { ContactsPage } from "@/types/ContactInfo.ts";

const URL = "/api/contacts";

export function fetchContacts(): Promise<ContactsPage> {
  return httpGet<ContactsPage>(URL);
}
