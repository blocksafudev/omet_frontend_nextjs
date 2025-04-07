import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";

// Inisialisasi modul 3D
if (typeof Highcharts === "object") {
  Highcharts3D(Highcharts);
}

const Donut3DChartLp = ({ data, title }) => {
  const chartData = data?.map((item) => [
    item.address || "Unknown address",
    parseFloat(item.percent), // Pastikan percent adalah angka
  ]);

  const options = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
    },
    title: {
      text: title || "Distribution",
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45,
      },
    },
    series: [
      {
        name: "Percentage",
        data: chartData,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Donut3DChartLp;
