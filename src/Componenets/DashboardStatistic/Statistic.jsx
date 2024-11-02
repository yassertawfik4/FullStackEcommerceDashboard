import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../Api/Api";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Statistic = () => {
  const [dataStats, setDataStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllData = async () => {
    try {
      const response = await api.get("/Statistic/DashbordStatistic");
      setDataStats(response.data);
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const barData = {
    labels: ["Users", "Products", "Categories"],
    datasets: [
      {
        label: "Count",
        data: [
          dataStats?.usersCount || 0,
          dataStats?.productsCount || 0,
          dataStats?.categorysCount || 0,
        ],
        backgroundColor: "#4CAF50",
      },
    ],
  };

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Active Users",
        data: [120, 150, 170, 130, 180, 190, 210],
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Statistics Overview",
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Active Users Over the Week",
      },
    },
  };

  const statistics = [
    { label: "Total Users", value: dataStats?.usersCount },
    { label: "Total Categories", value: dataStats?.categorysCount },
    { label: "Total Products", value: dataStats?.productsCount },
  ];

  return (
    <div className="container mx-auto overflow-hidden">
      <h1 className="text-3xl font-bold my-10 text-center">Statistics Overview</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {statistics.map((stat, index) => (
            <article
              key={index}
              className="shadow-md rounded-lg border border-gray-200 bg-white p-4 text-center w-60"
            >
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-3xl font-semibold text-gray-800">{stat.value}</p>
              <div className="mt-2 inline-flex items-center gap-1 text-green-600 bg-green-100 p-1 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-label={`Growth percentage for ${stat.label}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span className="text-xs font-medium">67.81%</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && !error && (
        <div className="flex flex-wrap justify-around gap-8">
          <div className="w-full md:w-1/2 lg:w-2/5 p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">Data Overview</h2>
            <Bar data={barData} options={options} />
          </div>

          <div className="w-full md:w-1/2 lg:w-2/5 p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">Weekly Active Users</h2>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistic;
