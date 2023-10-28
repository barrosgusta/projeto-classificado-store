import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export default async function getCategories(): Promise<Category[]> {
  const res = await fetch(URL);
  const data = await res.json();
  return data;
};