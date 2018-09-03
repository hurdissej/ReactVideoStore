import React from "react";
import _ from "lodash";

const Pagination = props => {
  const pagesCount = props.moviesCount / props.pageSize;
  const pages = _.range(1, pagesCount + 1);
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map(x => {
            const isActive =
              props.selectedPage === x ? "page-item active" : "page-item";
            return (
              <li key={x} className={isActive}>
                <a className="page-link" onClick={() => props.onPageChange(x)}>
                  {x}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
