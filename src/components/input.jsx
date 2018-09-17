import React from "react";

const Input = ({ id, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}> {label} </label>
      <input {...rest} id={id} autoFocus className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}{" "}
    </div>
  );
};

export default Input;
