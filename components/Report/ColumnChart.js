import Chart from "react-apexcharts";

export default function ColumnChart() {
  const options = {
    chart: {
      animations: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      id: "mychart",
      type: "bar",
      height: 350,
    },
    colors: ["#546E7A", "#fa1e0e"],
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      categories: ["업무 이해", "업무 처리"],
    },
    fill: {
      opacity: 1,
    },
  };
  const series = [
    {
      name: "고성과 집단",
      data: [55, 57],
    },
    {
      name: "지원자",
      data: [76, 85],
    },
  ];
  return (
    <div>
      <Chart options={options} series={series} type="bar" width="500" />
    </div>
  );
}
