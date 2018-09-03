import React from "react";
import _ from "lodash";

const Pagination = props => {
  const { moviesCount, pageSize, selectedPage, onPageChange } = props;
  const pagesCount = moviesCount / pageSize;
  const pages = _.range(1, pagesCount + 1);
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map(page => {
            const isActive =
              selectedPage === page ? "page-item active" : "page-item";
            return (
              <li key={page} className={isActive}>
                <a className="page-link" onClick={() => onPageChange(page)}>
                  {page}
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
