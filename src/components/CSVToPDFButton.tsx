import { getExcelData } from "@/apis/getExcelData";
import { getPDFData } from "@/apis/getPDFData";

export function CSVToPDFButton({ csv }: { csv: string }) {
  return (
    <button
      className="border py-2 px-4"
      onClick={async () => {
        const excelData = await getExcelData(csv);
        const pdfData = await getPDFData(excelData.data);
        let link = document.createElement("a");
        link.href = pdfData.data;
        link.download = "data.pdf";
        link.click();
        link.remove();
      }}
    >
      Download as PDF
    </button>
  );
}
