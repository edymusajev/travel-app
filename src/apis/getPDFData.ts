export const getPDFData = async (
  url: string
): Promise<{ data: string } | void> => {
  const res = await fetch(
    "https://api.apyhub.com/convert/spreadsheet-url/pdf-url",
    {
      method: "POST",
      headers: {
        "apy-token": process.env.NEXT_PUBLIC_APY_TOKEN as string,
      },
      body: JSON.stringify({
        url,
      }),
    }
  );
  return res.json();
};
