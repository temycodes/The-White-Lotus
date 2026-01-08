import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

function useRecentBookings() {
  const [searchParams] = useSearchParams();
  //   getting the params from dashboard filter
  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

  //   get date that is 7, 30, 90 days ago
  //   (date fns) function accepts two arguments: date and number of days to subtract
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
}

export default useRecentBookings;
