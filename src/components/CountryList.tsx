"use client";

import { Country } from "@/types";
import Link from "next/link";
import { useState } from "react";

export function CountryList({ countries }: { countries: Country[] }) {
  const [filteredCountries, setFilteredCountries] = useState("");

  const renderList = () => {
    return countries
      .filter((country) => {
        if (filteredCountries !== "") {
          return country.value
            .toLowerCase()
            .includes(filteredCountries.toLowerCase());
        }
        return true;
      })
      .map((country) => (
        <li key={country.key}>
          <Link href={country.key}>
            <>
              {country.emoji} {country.value}
            </>
          </Link>
        </li>
      ));
  };
  return (
    <>
      <form>
        <input
          className="border"
          type="text"
          value={filteredCountries}
          onChange={(e) => setFilteredCountries(e.target.value)}
        />
      </form>
      <ul className="space-y-2">{renderList()}</ul>
    </>
  );
}
