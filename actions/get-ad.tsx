const URL = `${process.env.NEXT_PUBLIC_API_URL}/anuncios`;

export default async function getAd(id: string): Promise<CarAd> {
  const res = await fetch(`${URL}/${id}`);
  const data = await res.json();
  return data;
};