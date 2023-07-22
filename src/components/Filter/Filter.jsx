import React from 'react';

const Filter = ({ value, onChange }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label htmlFor="filter" style={{ marginRight: '5px' }}>
        Filter contacts by name:
      </label>
      <input
        type="text"
        id="filter"
        name="filter"
        value={value}
        onChange={onChange}
        style={{ padding: '5px' }}
      />
    </div>
  );
};

export default Filter;
