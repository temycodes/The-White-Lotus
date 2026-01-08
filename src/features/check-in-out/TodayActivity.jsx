import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import useTodayActivity from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  grid-column: 1 / span 2;

  background-color: var(--surface-1);
  border: 1px solid var(--surface-border);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 2.8rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  max-height: 42rem;

  & h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.3;
  }
`;

const TodayList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { isLoading, activities } = useTodayActivity();

  return (
    <StyledToday>
      <Row type='horizontal'>
        <Heading as='h2'>TodayActivity</Heading>
      </Row>

      {isLoading ? (
        <Spinner />
      ) : activities?.length > 0 ? (
        <TodayList>
          {activities.map((activity) => (
            <TodayItem activity={activity} key={activity.id} />
          ))}
        </TodayList>
      ) : (
        <NoActivity>No Activity</NoActivity>
      )}
    </StyledToday>
  );
}

export default TodayActivity;
