import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking.js";
import Empty from "../../ui/Empty.jsx";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkoutMutate, isCheckoutPending } = useCheckout();
  const { isDeleting, deleteBookingMutate } = useDeleteBooking();

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  // status and bookingId are from the query
  const { status, id: bookingId } = booking || {};

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resource='booking'>Booking not found</Empty>;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "red",
  };

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        {/* <ButtonText onClick={moveBack}>&larr; Back</ButtonText> */}
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check In</Button>}

        {status === "checked-in" && (
          <Button onClick={() => checkoutMutate(bookingId)} disabled={isCheckoutPending}>
            Check Out
          </Button>
        )}

        <Modal>
          <Modal.Open opens='delete'>
            <Button variation='danger'> Delete Booking</Button>
          </Modal.Open>

          <Modal.Window name='delete'>
            <ConfirmDelete
              resourceName='booking'
              onConfirm={() =>
                deleteBookingMutate(bookingId, {
                  onSettled: () => navigate(-1),
                })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
