import { getCountries } from "@/apis/getCountries";
import { CountryList } from "@/components/CountryList";

export default async function Home() {
  const countries = await getCountries();
  console.log(countries);
  return (
    <>
      <CountryList countries={countries} />
    </>
  );
}
