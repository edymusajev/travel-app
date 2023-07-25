"use client";

import { getExcelData } from "@/apis/getExcelData";

export function CSVToExcelButton({ csv }: { csv: string }) {
  console.log(csv);
  return (
    <button
      className="border py-2 px-4"
      onClick={async () => {
        const excelData = (await getExcelData(csv)) as { data: string };
        let link = document.createElement("a");
        link.href = excelData.data;
        link.download = "data.xlsx";
        link.click();
        link.remove();
      }}
    >
      Download as Excel
    </button>
  );
}
