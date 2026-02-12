import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignUp() {
  const { mutate: mutateSignUp, isPending: pendingSignUp } = useMutation({
    mutationFn: signup,
    onSuccess: (user) => {
      toast.success(`Account Successfully created, verify new account from user email address`);
    },
  });

  return { mutateSignUp, pendingSignUp };
}

export default useSignUp;
