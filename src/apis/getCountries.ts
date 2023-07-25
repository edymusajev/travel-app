import { Country } from "@/types";

export async function getCountries() {
  const res = await fetch("https://api.apyhub.com/data/dictionary/country", {
    headers: {
      "apy-token": process.env.NEXT_PUBLIC_APY_TOKEN as string,
      "Content-Type": "application/json",
    },
  });
  const data: {
    data: Country[];
  } = await res.json();
  return data.data;
}
