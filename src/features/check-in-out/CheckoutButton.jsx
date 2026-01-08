import Button from "../../ui/Button";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkoutMutate, isCheckoutPending } = useCheckout();

  return (
    <Button variation='secondary' size='small' onClick={() => checkoutMutate(bookingId)} disabled={isCheckoutPending}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
