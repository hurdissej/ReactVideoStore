import React from "react";
const Filter = ({ items, textProp, valueProp, onFilter, activeFilter }) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProp] ? item[valueProp] : 0}
          onClick={() => onFilter(item)}
          className={
            item === activeFilter ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProp]}
        </li>
      ))}
    </ul>
  );
};

export default Filter;
