import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";

import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: mutateUserUpdate, isPending: isUpdating } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Successfully Updated User account");
      //   Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutateUserUpdate, isUpdating };
}

export default useUpdateUser;
