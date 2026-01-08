//get the current user and store it into cache

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isPending: userPending, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    userPending,
    user,
    isAuthenticated: Boolean(user),
  };
}
