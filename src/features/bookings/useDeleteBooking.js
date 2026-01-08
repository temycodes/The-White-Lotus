import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

//custom hook that returns mutate fn for deleting a cabin
function useDeleteBooking() {
  // queryclient is a hook that allows us to interact with the react query cache to invalidate queries after mutation
  const queryClient = useQueryClient();

  // returns mutate function used on button event handler. the function deletes a cabin
  const { isPending: isDeleting, mutate: deleteBookingMutate } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success("Booking deleted");

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBookingMutate };
}

export default useDeleteBooking;
