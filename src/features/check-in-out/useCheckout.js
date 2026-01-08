import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkoutMutate, isPending: isCheckoutPending } = useMutation({
    // mutation only accepts on argument
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    // data is the result of the mutate fn
    onSuccess: (data) => {
      toast.success(`Successfully Checked out Booking ${data.id}`);

      // invalidate all queries currently active on the page
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error("There was an error checking out");
    },
  });

  return { checkoutMutate, isCheckoutPending };
}

export default useCheckout;
