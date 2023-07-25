import { TripForm } from "@/components/TripForm";
import { Country, Currency } from "@/types";
//

async function getCountryData(slug: string) {
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

async function getCurrencies() {
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

export default async function CountryPage({
  params,
}: {
  params: { slug: string };
}) {
  const country = await getCountryData(params.slug);
  const currencies = await getCurrencies();
  return (
    <>
      <h1 className="text-xl">
        {country.emoji} {country.value}
      </h1>
      <p>
        {country.currency.symbol} {country.currency.value}
      </p>

      <TripForm currencies={currencies} countryCurrency={country.currency} />
    </>
  );
}
