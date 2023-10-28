const URL = `${process.env.NEXT_PUBLIC_API_URL}/anuncios`;

export async function getAds(): Promise<CarAd[]> {
  const res = await fetch(URL);
  const data = await res.json();
  return data;
};