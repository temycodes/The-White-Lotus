import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

// where we query the data from the api table using getCabins fn to get all cabins and map through them to display each cabin row
function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}

export default useCabins;
