import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ currPage, clickListener, numbers }) => (
  <>
    {isNaN(currPage) == false && (
      <ul
        key={"list"}
        data-test="paginationComponent"
        className="pagination justify-content-center"
      >
        {numbers.map(num => {
          return num == currPage ? (
            <li key={num} className="page-item active" data-test="paginationComponentBody">
              <a onClick={e => clickListener(num, e)} className="page-link">
                {num}
              </a>
            </li>
          ) : (
            <li key={num} className="page-item" data-test="paginationComponentBody">
              <a onClick={e => clickListener(num, e)} className="page-link">
                {num}
              </a>
            </li>
          );
        })}
      </ul>
    )}
  </>
);

Pagination.propTypes = {
  currPage: PropTypes.number,
  clickListener: PropTypes.func,
  numbers: PropTypes.array
};

export default Pagination;
