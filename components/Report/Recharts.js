import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
} from "recharts";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

const data = [
  {
    name: "",
    total: 5,
  },
  {
    name: "",
    total: 10,
  },
  {
    name: "D",
    total: 25,
  },
  {
    name: "C",
    total: 45,
  },
  {
    name: "B",
    total: 75,
  },
  {
    name: "A",
    total: 45,
  },
  {
    name: "S",
    total: 25,
  },
  {
    name: "",
    total: 10,
  },
  {
    name: "",
    total: 5,
  },
];

const Recharts = () => (
  <div>
    <AreaChart
      width={1000}
      height={300}
      data={data}
      margin={{
        top: 10,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor="#ffe8e8" />
          <stop offset="25%" stopColor="#ffb4b4" />
          <stop offset="40%" stopColor="#f05945" />
          <stop offset="60%" stopColor="#f05945" />
          <stop offset="75%" stopColor="#ffb4b4" />
          <stop offset="100%" stopColor="#ffe8e8" />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="5 5" />
      <Area
        type="monotone"
        dataKey="total"
        strokeDasharray="3 3"
        stroke="url(#gradient)"
        fill="url(#gradient)"
      />
      <XAxis dataKey="name" />
      {/* <YAxis dataKey="total" /> */}
      <ReferenceLine
        x={1}
        stroke="transparent"
        label={{
          position: "insideBottom",
          value: "최저점수: 20",
        }}
      />
      <ReferenceLine
        x={7}
        stroke="transparent"
        label={{ position: "insideTopLeft", value: "최고점수: 90" }}
      />
      <ReferenceLine
        x={7}
        // stroke="transparent"
        label={{ position: "insideLeft", value: "평균점수: 60" }}
      />
      <ReferenceLine x={4} stroke="transparent" label={"평균점수 : 65"} />
    </AreaChart>
  </div>
);

export default Recharts;
