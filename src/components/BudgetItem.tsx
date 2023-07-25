import { BudgetItem as BudgetItemType, Currency } from "../types";

interface BudgetItemProps {
  item: BudgetItemType;
  index: number;
  onItemChange: (
    index: number,
    field: keyof BudgetItemType,
    value: string | number
  ) => void;
  onRemove: (index: number) => void;
}

export const BudgetItem = ({
  item,
  index,
  onItemChange,
  onRemove,
  exchangeRate,
  countryCurrency,
}: BudgetItemProps & { exchangeRate?: number; countryCurrency: Currency }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={item.name}
        onChange={(e) => onItemChange(index, "name", e.target.value)}
        placeholder="Enter budget item"
        className="p-1 px-2 border rounded"
      />
      <input
        type="number"
        min="0"
        value={item.cost}
        onChange={(e) => onItemChange(index, "cost", parseInt(e.target.value))}
        placeholder="Enter cost"
        className="p-1 px-2 border rounded"
      />
      {exchangeRate && (
        <p className="italic text-gray-600">
          Converted cost in {countryCurrency.key} ({countryCurrency.symbol}):{" "}
          {(exchangeRate * item.cost).toFixed(2)}
        </p>
      )}
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="p-1 text-xs text-red-500 border border-red-500 rounded"
      >
        Remove
      </button>
    </div>
  );
};
