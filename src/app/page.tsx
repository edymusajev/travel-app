import { getCountries } from "@/apis/getCountries";
import { CountryList } from "@/components/CountryList";

export default async function Home() {
  const countries = await getCountries();
  return (
    <>
      <CountryList countries={countries} />
    </>
  );
}
