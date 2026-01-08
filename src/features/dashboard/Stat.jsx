import styled from "styled-components";

const StyledStat = styled.div`
  background-color: var(--surface-1);
  border: 1px solid var(--surface-border);
  border-radius: var(--border-radius-md);

  padding: 1.6rem;
  display: grid;
  grid-template-columns: 5.2rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.2rem;
  row-gap: 0.2rem;
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make these dynamic, based on the received prop */
  background-color: color-mix(in oklab, var(--color-${(props) => props.color}-600) 12%, var(--surface-1));

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-${(props) => props.color}-700);
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  font-weight: 600;
  color: var(--color-text-muted);
`;

const Value = styled.p`
  font-size: 2rem;
  line-height: 1.1;
  font-weight: 500;
  color: var(--color-text);
`;

function Stat({ icon, title, value, color }) {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
