"use client";

import { Currency } from "@/types";
import { useReducer, useState } from "react";
import useSWR from "swr";
import { BudgetItem } from "./BudgetItem";
import { budgetItemsReducer } from "@/reducers/budgetItemReducer";
import { convertToCSV } from "@/utils/convertToCSV";
import { CSVToExcelButton } from "./CSVToExcelButton";
import { CSVToPDFButton } from "./CSVToPDFButton";

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
  const [budgetItems, dispatchBudgetItems] = useReducer(budgetItemsReducer, [
    { name: "Food", cost: 200 },
    { name: "Accommodation", cost: 500 },
  ]);
  console.log(countryCurrency);

  const { data: exchangeRate } = useSWR(
    [
      "https://api.apyhub.com/data/convert/currency",
      currency,
      countryCurrency.key,
    ],
    ([url, currency, countryCurrencyKey]) =>
      fetchExchangeRate(url, currency, countryCurrency.key)
  );

  const totalBudget = budgetItems.reduce((total, item) => total + item.cost, 0);

  const budgetItemsWithTotal = [
    ...budgetItems,
    {
      name: "Total",
      cost: exchangeRate
        ? (exchangeRate.data * totalBudget).toFixed(2)
        : totalBudget,
    },
  ];

  return (
    <>
      <form className="my-16 flex flex-col space-y-4">
        <select
          className="border py-2 px-4"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency.key} value={currency.key}>
              {currency.key} - {currency.value}
            </option>
          ))}
        </select>

        {budgetItems.map((item, index) => (
          <BudgetItem
            key={index}
            item={item}
            index={index}
            onItemChange={(index, field, value) =>
              dispatchBudgetItems({ type: "update", index, field, value })
            }
            onRemove={(index) =>
              dispatchBudgetItems({ type: "remove", index: index })
            }
          />
        ))}
        <button
          className="border py-2 px-4 bg-blue-500 text-white"
          type="button"
          onClick={() => dispatchBudgetItems({ type: "add" })}
        >
          Add budget item
        </button>
      </form>

      {exchangeRate && (
        <div className="mb-2">
          <span className="space-x-2">
            <label>Total expenses </label>
            <span>
              {countryCurrency.symbol}
              {(exchangeRate.data * totalBudget).toFixed(2)}
            </span>
          </span>
        </div>
      )}
      <div className="space-x-4">
        <CSVToExcelButton csv={convertToCSV(budgetItemsWithTotal)} />
        <CSVToPDFButton csv={convertToCSV(budgetItemsWithTotal)} />
      </div>
    </>
  );
}
