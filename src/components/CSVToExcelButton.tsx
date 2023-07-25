import { convertToCSV } from "@/utils/convertToCSV";

const getExcelData = async (csv: string) => {
  const res = await fetch("https://api.apyhub.com/convert/csv-url/excel-file", {
    method: "POST",
    body: JSON.stringify({ csv }),
  });
  return res.json();
};

export function CSVToExcelButton({ csv }: { csv: string }) {
  console.log(csv);
  return <button>Download as Excel</button>;
}
