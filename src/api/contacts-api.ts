import {httpGet} from "@/api/https.ts";
import type {ContactsPage} from "@/types/ContactInfo.ts";

const URL = "/api/contacts.json";

export function fetchContacts() {
  return httpGet<ContactsPage>(URL);
}
