import React from "react";
import PropTypes from "prop-types";

const TableBody = ({ startPoint, endPoint, datas, clickListener }) => (
  <>
    {isNaN(startPoint) == false && (
      <tbody data-test="tableBodyComponent">
        {datas.map((data, i) => {
          return i >= startPoint && i < endPoint && i < datas.length ? (
            <tr key={i} data-test="tableRowComponent">
              <td>{data.PartitionKey}</td>
              <td>{data.RowKey}</td>
              <td>{data.Environment}</td>
              <td>{data.EmailId}</td>
              <td>{data.AADClientDescription}</td>
              <td>
                <button
                  onClick={e =>
                    clickListener(
                      data.PartitionKey,
                      data.RowKey,
                      data.Environment,
                      data.EmailId,
                      data.AADClientDescription,
                      e
                    )
                  }
                  className="buttonstyle btn"
                >
                  Onboard
                </button>
              </td>
            </tr>
          ) : null;
        })}
      </tbody>
    )}
  </>
);

TableBody.propTypes = {
  datas: PropTypes.array,
  startPoint: PropTypes.number,
  endPoint: PropTypes.number,
  clickListener: PropTypes.func
};

export default TableBody;
