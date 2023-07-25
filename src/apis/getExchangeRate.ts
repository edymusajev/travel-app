export const getExchangeRate = async (
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
