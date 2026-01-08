import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin() {
  // queryclient is a hook that allows us to interact with the react query cache to invalidate queries after mutation
  const queryClient = useQueryClient();

  // mutation for creating a cabin in the database and uploading image to storage
  const { mutate: createMutate, isPending: isCreatePending } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Successfully Created a Cabin");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createMutate, isCreatePending };
}

export default useCreateCabin;
