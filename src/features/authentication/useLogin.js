import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";

// this runs when the login form is submitted
function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: loginMutate, isPending: pendingLogin } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      // adding user to the cache after login cause getCurrentUser runs faster than supabase writes to local storage
      queryClient.setQueryData(["user"], data.user);
      toast.success("Succesfully logged in!");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });
  return { loginMutate, pendingLogin };
}

export default useLogin;
