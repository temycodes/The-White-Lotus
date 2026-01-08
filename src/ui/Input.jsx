import styled from "styled-components";

const Input = styled.input`
  padding: 0.8rem 1.5rem;
  font-size: 1.4rem;
  font-weight: 500;

  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-brand-900);
  background-color: var(--color-surface);
  color: var(--color-grey-800);

  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: var(--color-grey-400);
  }

  &:hover {
    border-color: var(--color-brand-300);
  }

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 3px rgba(234, 179, 8, 0.2);
  }

  &:disabled {
    background-color: var(--color-brand-50);
    color: var(--color-grey-500);
    cursor: not-allowed;
  }
`;

export default Input;
