import styled from "styled-components";
import Heading from "./Heading";
import GlobalStyles from "../styles/GlobalStyles";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const StyledErrorFallback = styled.main`
  min-height: 100vh;
  background-color: var(--surface-1);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 4rem;
`;

const Box = styled.div`
  background-color: var(--surface-1);
  border: 1px solid var(--surface-border);
  border-radius: var(--border-radius-md);

  padding: 3.2rem 4rem;
  flex: 0 1 72rem;

  text-align: center;

  & h1 {
    margin-bottom: 1.2rem;
  }

  & p {
    font-family: "Sono";
    font-size: 1.4rem;
    line-height: 1.5;
    margin-bottom: 2.4rem;
    color: var(--color-text);
  }
`;

function ErrorFallback({ error, resetErrorBoundary }) {
  const navigate = useNavigate();

  return (
    <StyledErrorFallback>
      <Box>
        <Heading as='h1'>Something went wrong :( </Heading>
        <p>{error.message}</p>
        <Button
          size='large'
          variation='secondary'
          onClick={() => {
            resetErrorBoundary();
            navigate("/dashboard");
          }}
        >
          Go Back
        </Button>
      </Box>
    </StyledErrorFallback>
  );
}

export default ErrorFallback;
