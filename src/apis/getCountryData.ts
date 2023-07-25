import { Country } from "@/types";

export async function getCountryData(slug: string): Promise<void | Country> {
  const res = await fetch(
    `https://api.apyhub.com/data/info/country?country=${slug}`,
    {
      headers: {
        "apy-token": process.env.NEXT_PUBLIC_APY_TOKEN as string,
        "Content-Type": "application/json",
      },
    }
  );
  const data: {
    data: Country;
  } = await res.json();
  return data.data;
}
