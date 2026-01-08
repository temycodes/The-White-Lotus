import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: mutateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Successfully Edited a Setting");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutateSetting, isUpdating };
}

export default useUpdateSettings;
