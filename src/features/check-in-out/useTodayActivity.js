import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["activities"],
  });

  //   activities will be an array of bookings that have check in or check out today

  return { isLoading, activities };
}

export default useTodayActivity;
