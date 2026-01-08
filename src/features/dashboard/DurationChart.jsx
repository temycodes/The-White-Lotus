import styled from "styled-components";
import Heading from "../../ui/Heading";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
// const startDataDark = [
//   {
//     duration: "1 night",
//     value: 0,
//     color: "#b91c1c",
//   },
//   {
//     duration: "2 nights",
//     value: 0,
//     color: "#c2410c",
//   },
//   {
//     duration: "3 nights",
//     value: 0,
//     color: "#a16207",
//   },
//   {
//     duration: "4-5 nights",
//     value: 0,
//     color: "#4d7c0f",
//   },
//   {
//     duration: "6-7 nights",
//     value: 0,
//     color: "#15803d",
//   },
//   {
//     duration: "8-14 nights",
//     value: 0,
//     color: "#0f766e",
//   },
//   {
//     duration: "15-21 nights",
//     value: 0,
//     color: "#1d4ed8",
//   },
//   {
//     duration: "21+ nights",
//     value: 0,
//     color: "#7e22ce",
//   },
// ];

const ChartBox = styled.section`
  grid-column: 3 / span 2;

  background-color: var(--surface-1);
  border: 1px solid var(--surface-border);
  border-radius: var(--border-radius-md);

  padding: 1.4rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  & h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.3;
  }

  & .recharts-pie-label-text {
    font-weight: 500;
    fill: var(--color-text);
  }
`;

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) => (obj.duration === field ? { ...obj, value: obj.value + 1 } : obj));
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedStays, isAnimationActive = true }) {
  const data = prepareData(startDataLight, confirmedStays);
  return (
    <ChartBox>
      <Heading as='h2'> Booking Duration Summary</Heading>
      <ResponsiveContainer width='100%' height={250}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={80}
            outerRadius={105}
            cornerRadius={12}
            paddingAngle={4}
            cx='42%'
            cy='50%'
            dataKey='value'
            nameKey='duration'
            isAnimationActive={isAnimationActive}
          >
            {data.map((entry) => (
              <Cell fill={entry.color} stroke={entry.color} key={entry.duration} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name) => [`${value} stays`, name]}
            contentStyle={{
              backgroundColor: "var(--surface-1)",
              border: "1px solid var(--surface-border)",
              borderRadius: "var(--border-radius-sm)",
              padding: "0.6rem 0.8rem",
              fontSize: "1.2rem",
              color: "var(--color-text)",
            }}
            itemStyle={{
              color: "var(--color-text)",
            }}
          />

          <Legend
            verticalAlign='middle'
            align='right'
            layout='vertical'
            iconSize={10}
            wrapperStyle={{
              fontSize: "1.2rem",
              color: "var(--color-text-muted)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
