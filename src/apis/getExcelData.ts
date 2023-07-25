export const getExcelData = async (
  csv: string
): Promise<{ data: string } | void> => {
  let formData = new FormData();
  let csvFile = new File([csv], "data.csv", { type: "text/csv" });
  formData.append("file", csvFile);
  const res = await fetch("https://api.apyhub.com/convert/csv-file/excel-url", {
    method: "POST",
    headers: {
      "apy-token": process.env.NEXT_PUBLIC_APY_TOKEN as string,
    },
    body: formData,
  });
  return res.json();
};
