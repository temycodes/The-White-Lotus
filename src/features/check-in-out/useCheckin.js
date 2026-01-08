import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: checkinMutate, isPending: isCheckinPending } = useMutation({
    // mutation only accepts on argument
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    // data is the result of the mutate fn
    onSuccess: (data) => {
      toast.success(`Successfully Checked in Booking ${data.id}`);

      // invalidate all queries currently active on the page
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => {
      toast.error("There was an error checking in");
    },
  });

  return { checkinMutate, isCheckinPending };
}

export default useCheckin;
