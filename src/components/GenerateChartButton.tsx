import { getPieChart } from "@/apis/getPieChart";

export type ChartData = {
  name: string;
  value: number;
  currency: string;
};
type ChartProps = {
  data: ChartData[];
};

export function GenerateChartButton({ data }: ChartProps) {
  return (
    <button
      className="border py-2 px-4"
      onClick={async () => {
        const chartData = (await getPieChart(
          data.filter((item) => item.name !== "Total expenses")
        )) as { data: string };
        let link = document.createElement("a");
        link.href = chartData.data;
        link.download = "chart.png";
        link.click();
        link.remove();
      }}
    >
      Generate Pie Chart
    </button>
  );
}
