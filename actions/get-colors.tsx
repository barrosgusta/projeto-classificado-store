import { Color } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

export default async function getColors(): Promise<Color[]> {
  const res = await fetch(URL);
  const data = await res.json();
  return data;
};