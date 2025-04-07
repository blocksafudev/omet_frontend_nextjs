import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsTimeline from "highcharts/modules/timeline";

// Inisialisasi modul timeline
if (typeof Highcharts === "object") {
  HighchartsTimeline(Highcharts);
}

const TimelineChart = ({
  tokenCreated,
  requestDate,
  onboardDate,
  revisionDate,
  releaseDate,
}) => {
  const parseDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).getTime();
  };

  const parseTokenCreatedDate = (dateString) => {
    if (!dateString) return null;
    const [datePart, timePart] = dateString.split(" ");
    const [month, day, year] = datePart.split("-");
    const [time, ampm] = timePart.split(" ");
    const [hours, minutes, seconds] = time.split(":");

    const monthMap = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    let parsedHours = parseInt(hours);
    if (ampm === "PM" && parsedHours !== 12) {
      parsedHours += 12;
    } else if (ampm === "AM" && parsedHours === 12) {
      parsedHours = 0;
    }

    return Date.UTC(year, monthMap[month], day, parsedHours, minutes, seconds);
  };

  const createTimelineData = () => {
    const dates = [
      { name: "Token Created", date: parseTokenCreatedDate(tokenCreated) },
      { name: "Audit Request", date: parseDate(requestDate) },
      { name: "Audit Onboard", date: parseDate(onboardDate) },
      { name: "Revision", date: parseDate(revisionDate) },
      { name: "Release", date: parseDate(releaseDate) },
    ];

    dates.sort((a, b) => a.date - b.date);

    let yOffset = 0;
    const timelineData = dates.map((item, index) => {
      const prevDate = index > 0 ? dates[index - 1].date : null;
      if (prevDate && item.date === prevDate) {
        yOffset += 1;
      } else {
        yOffset = 0;
      }

      return {
        x: item.date,
        name: item.name,
        label: item.name,
        description: `${item.name}: ${new Date(item.date).toLocaleString()}`,
        y: yOffset,
      };
    });

    return timelineData;
  };

  const options = {
    chart: {
      type: "timeline",
      zoomType: "x",
    },
    xAxis: {
      type: "datetime",
      visible: true,
    },
    yAxis: {
      gridLineWidth: 1,
      title: null,
      labels: {
        enabled: false,
      },
    },
    title: {
      text: "Project Timeline",
    },
    subtitle: {
      text: "Klik dan seret untuk memperbesar",
    },
    tooltip: {
      style: {
        width: 300,
      },
    },
    series: [
      {
        dataLabels: {
          allowOverlap: false,
          format:
            '<span style="color:{point.color}">● </span><span style="font-weight: bold;" > {point.x:%d %b %Y}</span><br/>{point.label}',
        },
        marker: {
          symbol: "circle",
        },
        data: createTimelineData(),
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default TimelineChart;
