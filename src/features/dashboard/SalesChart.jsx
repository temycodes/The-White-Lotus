import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  background-color: var(--surface-1);
  border: 1px solid var(--surface-border);
  border-radius: var(--border-radius-md);

  /* makes the chart contain the whole row */
  grid-column: 1 / -1;
  padding: 1.2rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  & h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.3;
  }
`;

// data format
// { label: "Jan 09", totalSales: 480, extrasSales: 20 },

// const isDarkMode = true;
// const colors = isDarkMode
//   ? {
//       totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
//       extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
//       text: "#e5e7eb",
//       background: "#18212f",
//     }
//   : {
//       totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
//       extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
//       text: "#374151",
//       background: "#fff",
//     };

function SalesChart({ bookings, numDays }) {
  const allDate = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDate.map((date) => {
    return {
      label: format(date, "EEE dd"),

      // total sales
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),

      // extra sales
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  return (
    <StyledSalesChart>
      <Heading as='h2'>
        Revenue from {format(allDate.at(0), "MMM/dd/yyyy")} to {format(allDate.at(-1), "MMM/dd/yyyy")}
      </Heading>

      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={data}>
          <XAxis
            dataKey='label'
            tick={{ fill: "var(--color-grey-500)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis unit='$' tick={{ fill: "var(--color-grey-500)", fontSize: 12 }} axisLine={false} tickLine={false} />

          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-grey-0)",
              border: "1px solid var(--color-grey-200)",
              borderRadius: "var(--border-radius-sm)",
              fontSize: "1.2rem",
            }}
          />

          {/* line for extra sales */}
          <Line
            type='monotone'
            dataKey='extrasSales'
            stroke='#e7ef0b'
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            name='Extra Sales'
            unit='$'
          />

          {/* line for total sales */}
          <Line
            type='monotone'
            dataKey='totalSales'
            stroke='#16a34a'
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            name='Total Sales'
            unit='$'
          />
        </LineChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
