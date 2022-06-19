import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ScatterDataPoint,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { BotAnalytics } from "../../../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function WorkspaceStats({
  botAnalytics,
}: {
  botAnalytics: BotAnalytics[];
}) {
  botAnalytics
    .map((a) => new Date(a.timestamp).toLocaleDateString())
    .reverse() ?? [];

  const dataSet = {
    labels: botAnalytics.map((a) => new Date(a.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: "Commands",
        data: botAnalytics
          .map((a) =>
            Object.values(a.commands ?? {}).reduce((acc, curr) => acc + curr, 0)
          )
          .reverse(),
        backgroundColor: "rgba(235, 12, 202, 0.2)",
        borderColor: "rgba(235, 12, 202, 1)",
      },
      {
        label: "Messages",
        data: botAnalytics.map((a) => a.messages ?? 0).reverse(),
        backgroundColor: "rgba(255, 194, 74, 0.2)",
        borderColor: "rgba(255, 194, 74, 1)",
      },
      {
        label: "Server Members",
        data: botAnalytics.map((a) => a.members ?? 0).reverse(),
        backgroundColor: "rgba(74, 186, 122, 0.2)",
        borderColor: "rgba(74, 186, 122, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Bot analytics over time",
        color: "white",
      },
    },
  };

  return (
    <div className="flex-col items-start justify-between hidden w-full p-10 space-y-16 border border-gray-300 rounded-lg lg:flex col-span-full dark:bg-black-200 dark:border-none">
      <Line options={options} data={dataSet} />
    </div>
  );
}
