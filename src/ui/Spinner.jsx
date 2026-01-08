import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Spinner = styled.div`
  width: 4.8rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: var(--color-brand-600);
  border-right-color: var(--color-brand-300);
  animation: spin 0.9s ease-in-out infinite;
  margin: 4.8rem auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
