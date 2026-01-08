import styled from "styled-components";

const StyledSelect = styled.select`
  /* Typography and spacing */
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.8rem 1.2rem;

  /* Border and radius */
  border: 1px solid ${(props) => (props.type === "white" ? "var(--color-brand-200)" : "var(--color-brand-300)")};
  border-radius: var(--border-radius-sm);

  /* Background and shadow */
  background-color: var(--color-surface); /* matches table rows/cards */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04); /* subtle lift */

  &:hover {
    border-color: var(--color-brand-500);
  }

  &:focus {
    border-color: var(--color-brand-600);
    outline: none;
    box-shadow: 0 0 0 3px rgba(234, 179, 8, 0.2); /* subtle brand focus ring */
  }

  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Smooth transitions for interactive states */
  transition: all 0.2s ease;
`;

function Select({ options, value, onChange }) {
  return (
    <StyledSelect value={value} onChange={onChange}>
      {/* lists all the options */}
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
