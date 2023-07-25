import { BudgetItem as BudgetItemType } from "../types";

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
}: BudgetItemProps) => {
  return (
    <div className="space-x-2">
      <input
        type="text"
        value={item.name}
        onChange={(e) => onItemChange(index, "name", e.target.value)}
        placeholder="Enter budget item"
      />
      <input
        type="number"
        min="0"
        value={item.cost}
        onChange={(e) => onItemChange(index, "cost", parseInt(e.target.value))}
        placeholder="Enter cost"
      />
      <button
        className="
        border
        py-2
        px-4
        bg-red-500
        text-white
      "
        type="button"
        onClick={() => onRemove(index)}
      >
        Remove
      </button>
    </div>
  );
};
