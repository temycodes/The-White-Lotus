import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(BiLoaderAlt)`
  width: 2rem;
  height: 2rem;
  color: var(--color-brand-600);
  filter: drop-shadow(0 0 0 var(--color-brand-300));
  animation: ${rotate} 0.9s linear infinite;
`;

export default SpinnerMini;
