"use client";

const getExcelData = async (csv: string): Promise<{ data: string }> => {
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

export function CSVToExcelButton({ csv }: { csv: string }) {
  console.log(csv);
  return (
    <button
      className="border py-2 px-4 "
      onClick={async () => {
        const excelData = await getExcelData(csv);
        console.log(excelData);
        let link = document.createElement("a");
        link.href = excelData.data;
        link.download = "data.xlsx";
        link.click();
      }}
    >
      Download as Excel
    </button>
  );
}
