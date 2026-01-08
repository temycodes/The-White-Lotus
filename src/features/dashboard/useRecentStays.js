import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentStays() {
  const [searchParams] = useSearchParams();
  //   getting the params from dashboard filter
  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));

  //   get date that is 7, 30, 90 days ago
  //   (date fns) function accepts two arguments: date and number of days to subtract
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading: isLoadingStays, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = stays?.filter((stay) => stay.status === "checked-in" || "checked-out");

  return { isLoadingStays, stays, confirmedStays, numDays };
}

export default useRecentStays;
