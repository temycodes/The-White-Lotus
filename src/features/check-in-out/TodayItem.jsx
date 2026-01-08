import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: auto 2.6rem 1fr auto auto;
  gap: 1rem;
  align-items: center;

  padding: 0.8rem 0.6rem;
  background-color: var(--surface-1);
  border-radius: var(--border-radius-sm);

  font-size: 1.4rem;
  color: var(--color-text);

  &:hover {
    background-color: color-mix(in oklab, var(--color-brand-900) 5%, var(--surface-1));
  }
`;

const Guest = styled.div`
  font-weight: 500;
  color: var(--color-text);
  font-size: 1.2rem;

  white-space: normal;
  word-break: break-word;
  line-height: 1.4;
`;

// actvity repsresents a booking activity for today
function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type='green'> Arriving</Tag>}
      {status === "checked-in" && <Tag type='red'> Departing</Tag>}

      <Flag src={guests.countryFlag} alt={`flag of ${guests.nationality}`} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Button size='small' variation='secondary' as={Link} to={`/checkin/${id}`}>
          Check in
        </Button>
      )}

      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
