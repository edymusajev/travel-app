import { Currency } from "@/types";

export async function getCurrencies() {
  const res = await fetch("https://api.apyhub.com/data/dictionary/currency", {
    headers: {
      "apy-token": process.env.NEXT_PUBLIC_APY_TOKEN as string,
      "Content-Type": "application/json",
    },
  });
  const data: {
    data: Currency[];
  } = await res.json();
  return data.data;
}
