"use client";

import { Currency } from "@/types";
import { useReducer, useState } from "react";
import useSWR from "swr";
import { BudgetItem } from "./BudgetItem";
import { budgetItemsReducer } from "@/reducers/budgetItemReducer";
import { convertToCSV } from "@/utils/convertToCSV";
import { CSVToExcelButton } from "./CSVToExcelButton";
import { CSVToPDFButton } from "./CSVToPDFButton";
import { GenerateChartButton } from "./GenerateChartButton";
import { getExchangeRate } from "@/apis/getExchangeRate";

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

  const { data: exchangeRate } = useSWR(
    [
      "https://api.apyhub.com/data/convert/currency",
      currency,
      countryCurrency.key,
    ],
    ([url, currency, countryCurrencyKey]) =>
      getExchangeRate(url, currency, countryCurrency.key)
  );

  const totalBudget = budgetItems.reduce((total, item) => total + item.cost, 0);

  const budgetItemsWithConvertedCosts = budgetItems.map((item) => ({
    name: item.name,
    cost: item.cost,
    localCost: exchangeRate
      ? (exchangeRate.data * item.cost).toFixed(2)
      : "N/A",
  }));

  const budgetItemsWithTotalAndConversion = [
    ...budgetItemsWithConvertedCosts,
    {
      name: `Total expenses`,
      cost: totalBudget,
      localCost: exchangeRate
        ? (exchangeRate.data * totalBudget).toFixed(2)
        : "N/A",
    },
  ];

  return (
    <>
      <form
        className="my-16 flex flex-col space-y-4
        
      "
      >
        <select
          className="border py-2 px-4 rounded"
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
            exchangeRate={exchangeRate?.data}
            countryCurrency={countryCurrency}
            onItemChange={(index, field, value) =>
              dispatchBudgetItems({ type: "update", index, field, value })
            }
            onRemove={(index) =>
              dispatchBudgetItems({ type: "remove", index: index })
            }
          />
        ))}
        <div>
          <button
            className="border py-2 px-4 bg-blue-500 text-white rounded"
            type="button"
            onClick={() => dispatchBudgetItems({ type: "add" })}
          >
            Add budget item
          </button>
        </div>
      </form>

      {exchangeRate && (
        <div className="mb-12">
          <span className="space-x-2">
            <label>Total expenses </label>
            <span className="text-xl">
              {countryCurrency.symbol}
              {(exchangeRate.data * totalBudget).toFixed(2)}
            </span>
          </span>
        </div>
      )}
      <div className="space-x-4">
        <CSVToExcelButton
          csv={convertToCSV(budgetItemsWithTotalAndConversion, {
            userCurrencySymbol: currencies.find((c) => c.key === currency)
              ?.symbol as string,
            localCurrencySymbol: countryCurrency.symbol as string,
          })}
        />
        <CSVToPDFButton
          csv={convertToCSV(budgetItemsWithTotalAndConversion, {
            userCurrencySymbol: currencies.find((c) => c.key === currency)
              ?.symbol as string,
            localCurrencySymbol: countryCurrency.symbol as string,
          })}
        />
        <GenerateChartButton
          data={budgetItemsWithTotalAndConversion.map((item) => ({
            name: item.name,
            value: item.cost,
            currency: currencies.find((c) => c.key === currency)?.symbol ?? "",
          }))}
        />
      </div>
    </>
  );
}
