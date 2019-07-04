import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { adalApiFetch } from "../../config/adalConfig";
import * as checkApi from "../../api/processChecksApi";
import NavBarAnother from "../presentationals/NavBar/NavBarAnother";
import Table from "react-bootstrap/Table";
import Loading from "../presentationals/Loading";
import TableBody from "../TableBody/TableBody";
import Pagination from "../pagination/Pagination";
import { withRouter } from "react-router";
import AbortController from "abort-controller";

function PendingApprovals({ history }) {
  const entriesInPage = 5;
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pagesArray, setPagesArray] = useState([]);

  useEffect(() => {
    let url = "https://hawkbackend.azurewebsites.net/api/pendingrequest";
    const controller = new AbortController();
    const signal = controller.signal;
    checkApi
      .getResponse(url, null, "GET", signal)
      .then(result => {
        setData(result);
        setIsLoaded(true);
        setTotalPages(Math.ceil(result.length / entriesInPage));
        let tempArray = [];
        for (let i = 1; i <= Math.ceil(result.length / entriesInPage); i++) {
          tempArray.push(i);
        }
        setPagesArray(tempArray);
      })
      .catch(error => {
        console.log(error);
        setIsLoaded(true);
      });
  }, []);

  function handleApproveClick(
    serviceName,
    clientId,
    environment,
    requestedBy,
    clientDescription,
    e
  ) {
    e.preventDefault();
    history.push({
      pathname: "/approval",
      state: {
        serviceName,
        clientId,
        environment,
        requestedBy,
        clientDescription
      }
    });
  }

  function handleClick(i, e) {
    e.preventDefault();
    setCurrPage(i);
  }

  return (
    <>
      <NavBarAnother />
      <div className="container" data-test="userComponent">
        <Table
          responsive
          className="approveTableBody"
          data-test="tableComponent"
        >
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Client Id</th>
              <th>Environment</th>
              <th>Requested By</th>
              <th>Client Desc</th>
              <th>Approve</th>
            </tr>
          </thead>
          <TableBody
            startPoint={(currPage - 1) * entriesInPage}
            endPoint={(currPage - 1) * entriesInPage + entriesInPage}
            datas={data}
            clickListener={handleApproveClick}
          />
        </Table>
      </div>
      {isLoaded == false && <Loading />}
      <Pagination
        currPage={currPage}
        totalPage={totalPages}
        clickListener={handleClick}
        numbers={pagesArray}
      />
    </>
  );
}

PendingApprovals.propTypes = {
  history: PropTypes.object
};

export default PendingApprovals;
