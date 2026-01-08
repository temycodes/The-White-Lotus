import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

//custom hook that returns mutate fn for deleting a cabin
function useDeleteCabin() {
  // queryclient is a hook that allows us to interact with the react query cache to invalidate queries after mutation
  const queryClient = useQueryClient();

  // returns mutate function used on button event handler. the function deletes a cabin
  const { isPending, mutate: deleteMutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("cabin deleted");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, deleteMutate };
}

export default useDeleteCabin;
