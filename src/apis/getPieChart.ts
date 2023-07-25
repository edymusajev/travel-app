import { ChartData } from "@/components/GenerateChartButton";

export async function getPieChart(data: ChartData[]) {
  const bodyData = data.map((item) => ({
    value: item.value,
    label: item.name,
  }));
  const res = await fetch("https://api.apyhub.com/generate/charts/pie/url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apy-token": `${process.env.NEXT_PUBLIC_APY_TOKEN}`,
    },

    body: JSON.stringify({
      data: bodyData,
    }),
  });
  const json = await res.json();
  return json;
}
