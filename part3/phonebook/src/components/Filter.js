import React from "react";

const Filter = ({ filterBy, handleFilterChange }) => {
  return (
    <div>
      Filter by name:
      <input value={filterBy} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;