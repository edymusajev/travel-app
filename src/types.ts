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
