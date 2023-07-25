export type Country = {
  calling_codes: string[];
  cca3: string;
  currency: {
    emoji: string;
    key: string;
    symbol: string;
    value: string;
  };
  emoji: string;
  key: string;
  value: string;
};

export type Currency = {
  emoji: string;
  key: string;
  value: string;
  symbol?: string;
};

export type BudgetItem = {
  name: string;
  cost: number;
};

export type BudgetItemsAction =
  | { type: "add" }
  | { type: "remove"; index: number }
  | {
      type: "update";
      index: number;
      field: keyof BudgetItem;
      value: string | number;
    };
