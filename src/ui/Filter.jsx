import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  /* Border and background */
  border: 1px solid var(--color-brand-200);
  background-color: var(--color-surface);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;

  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-surface);
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;

  /* Active state */
  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
      transform: translateY(-1px);
    `}

  /* Hover state (only if not disabled) */
  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
    transform: translateY(-1px); /* same lift as active for consistency */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }

  /* Disabled state (optional) */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // currentFilter = all, discount, no-discount
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  // filterField = discount
  function handleClick(value) {
    searchParams.set(filterField, value);

    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          $active={currentFilter === option.value}
          disabled={currentFilter === option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
