import { CountryList } from "@/components/CountryList";
import { Country } from "@/types";
import Image from "next/image";

async function getCountries() {
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

export default async function Home() {
  const countries = await getCountries();
  console.log(countries);
  return (
    <>
      <CountryList countries={countries} />
    </>
  );
}
