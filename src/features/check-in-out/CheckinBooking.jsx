import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckIn";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();

  // setting the value for the initial state of confirm paid cause on mount the value of confirmed/unconfirmed hasn't arrived yet
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  const moveBack = useMoveBack();

  // custom hooks
  const { checkinMutate, isCheckinPending } = useCheckin();
  const { settings, isPending: isLoadingSettings } = useSettings();

  if (isLoading || isLoadingSettings) return <Spinner />;

  //destructuring booking query
  const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking;

  const breakfastAmount = settings.breakFastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkinMutate({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: breakfastAmount,
          totalPrice: totalPrice + breakfastAmount,
        },
      });
    } else {
      checkinMutate({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {/* confirm breakfast payment */}
      {!hasBreakfast && (
        <Box>
          <Checkbox
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id='breakfast'
          >
            Add breakfast for {numNights} nights for {formatCurrency(breakfastAmount)}?
          </Checkbox>
        </Box>
      )}

      {/* confirm payment */}
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckinPending}
        >
          Tick to confirm {guests.fullName} has paid in full, the amount of {""}
          {!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + breakfastAmount)}`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckinPending}>
          Check in booking #{bookingId}
        </Button>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
