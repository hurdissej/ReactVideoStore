import React from "react";

const Dropdown = ({ id, label, error, options, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}> {label} </label>
      <select className="custom-select" id={id} {...rest}>
        <option key={0} defaultValue />
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}{" "}
    </div>
  );
};

export default Dropdown;
