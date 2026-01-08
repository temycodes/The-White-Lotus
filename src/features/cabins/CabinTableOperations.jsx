import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField='discount'
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "Discount" },
        ]}
      />
      <SortBy
        options={[
          {
            value: "name-asc",
            label: "sort A to Z",
          },
          {
            value: "name-desc",
            label: "sort Z to A",
          },
          {
            value: "regularPrice-asc",
            label: "Highest Price",
          },
          {
            value: "regularPrice-desc",
            label: "Lowest Price",
          },
          {
            value: "maxCapacity-asc",
            label: "Highest Capacity",
          },
          {
            value: "maxCapacity-desc",
            label: "Lowest Capacity",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
