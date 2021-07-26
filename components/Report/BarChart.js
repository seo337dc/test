import Chart from "react-apexcharts";
import styles from "./BarChart.module.scss";

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
      height: 300,
    },
    colors: ["#546E7A", "#fa1e0e"],
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
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
    xaxis: {
      categories: ["의사전달"],
      labels: {
        show: false,
      },
      crosshairs: {
        show: false,
        stroke: {
          color: "transparent",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      markers: {
        width: 0,
        height: 0,
      },
    },
  };
  const series = [
    {
      name: "",
      data: [55],
    },
    {
      name: "",
      data: [76],
    },
  ];
  return (
    <>
      <div className={styles.barchart_wrap}>
        <Chart options={options} series={series} type="bar" width="200" />
        <Chart options={options} series={series} type="bar" width="200" />
        <Chart options={options} series={series} type="bar" width="200" />
        <Chart options={options} series={series} type="bar" width="200" />
        <Chart options={options} series={series} type="bar" width="200" />
      </div>
      <div className={styles.barchart_wrap}>
        <Chart options={options} series={series} type="bar" width="200" />
        <Chart options={options} series={series} type="bar" width="200" />
        <Chart options={options} series={series} type="bar" width="200" />
        <Chart options={options} series={series} type="bar" width="200" />
        <Chart options={options} series={series} type="bar" width="200" />
      </div>
      <div className={styles.barchart_wrap}>
        <Chart options={options} series={series} type="bar" width="200" />
        <Chart options={options} series={series} type="bar" width="200" />
        <Chart options={options} series={series} type="bar" width="200" />
        <Chart options={options} series={series} type="bar" width="200" />
        <Chart options={options} series={series} type="bar" width="200" />
      </div>
      <div className={styles.barchart_wrap}>
        <Chart options={options} series={series} type="bar" width="200" />
        <Chart options={options} series={series} type="bar" width="200" />
        <Chart options={options} series={series} type="bar" width="200" />
        <Chart options={options} series={series} type="bar" width="200" />
        <Chart options={options} series={series} type="bar" width="200" />
      </div>
    </>
  );
}
