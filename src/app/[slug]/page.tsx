import { getCountryData } from "@/apis/getCountryData";
import { getCurrencies } from "@/apis/getCurrencies";
import { TripForm } from "@/components/TripForm";
import { Country, Currency } from "@/types";
//

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
