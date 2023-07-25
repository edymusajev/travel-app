"use client";

import { Currency } from "@/types";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const fetchExchangeRate = async (
  url: string,
  sourceCurrencyKey: string,
  targetCurrencyKey: string
): Promise<{ data: number }> => {
  const res = await fetch(url, {
    headers: {
      "apy-token": process.env.NEXT_PUBLIC_APY_TOKEN as string,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      source: sourceCurrencyKey,
      target: targetCurrencyKey,
    }),
  });
  return res.json();
};

export function TripForm({
  currencies,
  countryCurrency,
}: {
  currencies: Currency[];
  countryCurrency: Currency;
}) {
  const [currency, setCurrency] = useState("EUR");
  const [budget, setBudget] = useState(1);

  const { data: exchangeRate, trigger } = useSWRMutation(
    [
      "https://api.apyhub.com/data/convert/currency",
      currency,
      countryCurrency.key,
    ],
    ([url, currency, countryCurrencyKey]) =>
      fetchExchangeRate(url, currency, countryCurrency.key)
  );

  return (
    <>
      <form
        className="my-16 flex flex-col space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          trigger();
        }}
      >
        <span>
          <label>Currency</label>
          <select
            className="border"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency.key} value={currency.key}>
                {currency.key} - {currency.value}
              </option>
            ))}
          </select>
        </span>

        <span className="space-x-2">
          <label>Budget ({currency})</label>
          <input
            type="number"
            min="1"
            className="border"
            value={budget}
            onChange={(e) => setBudget(parseInt(e.target.value))}
          />
          <button type="submit">Get exchange rate</button>
        </span>
        {exchangeRate?.data && !!budget && (
          <span>
            {countryCurrency.symbol} {(exchangeRate.data * budget).toFixed(2)}
          </span>
        )}
      </form>
    </>
  );
}
