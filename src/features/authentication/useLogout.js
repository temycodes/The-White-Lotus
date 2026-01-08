import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logoutMutate, isPending: logoutPending } = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("Successfully Logged Out");
      navigate("/login", { replace: true });
    },
  });

  return { logoutMutate, logoutPending };
}

export default useLogout;
