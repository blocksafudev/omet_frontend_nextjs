import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";

// Inisialisasi modul 3D
if (typeof Highcharts === "object") {
  Highcharts3D(Highcharts);
}

const Donut3DChart = ({ data, title }) => {
  const chartData = data.map((item) => [
    item.fee_name || "No tax in this contract",
    parseFloat(item.fee_value),
  ]);

  const options = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
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
        name: "Value",
        data: chartData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Donut3DChart;
