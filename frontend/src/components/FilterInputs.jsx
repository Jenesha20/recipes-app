import React from 'react';

const FilterInputs = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={filters.title || ''}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Cuisine"
        name="cuisine"
        value={filters.cuisine || ''}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Rating"
        name="rating"
        value={filters.rating || ''}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Calories"
        name="calories"
        value={filters.calories || ''}
        onChange={handleChange}
      />
    </div>
  );
};

export default FilterInputs;
