import { HiCalendar, HiChartPie, HiCurrencyDollar } from "react-icons/hi";
import { FaCarSide } from "react-icons/fa";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numCabins, numDays }) {
  // number of bookings
  const numOfBookings = bookings.length;

  //   total sales
  const totalSales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //   arrivals
  const arrivals = confirmedStays.length;

  //   occupancy rate (num of checked-in nights / all available nights * num of numCabins)

  const occupancy = confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) / (numDays * numCabins);

  return (
    <>
      <Stat title='Bookings' color='blue' icon={<HiCalendar />} value={numOfBookings} />

      <Stat title='Revenue' color='green' icon={<HiCurrencyDollar />} value={formatCurrency(totalSales)} />

      <Stat title='Arrivals' color='red' icon={<FaCarSide />} value={arrivals} />

      <Stat title='Occupancy rate' color='indigo' icon={<HiChartPie />} value={Math.round(occupancy * 100) + "%"} />
    </>
  );
}

export default Stats;
