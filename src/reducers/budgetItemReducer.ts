import { BudgetItem, BudgetItemsAction } from "../types";

export const budgetItemsReducer = (
  state: BudgetItem[],
  action: BudgetItemsAction
): BudgetItem[] => {
  switch (action.type) {
    case "add":
      return [...state, { name: "", cost: 0 }];
    case "remove":
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    case "update":
      return state.map((item, index) => {
        if (index === action.index) {
          return { ...item, [action.field]: action.value };
        }
        return item;
      });
    default:
      return state;
  }
};
