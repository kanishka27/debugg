import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { authContext, adalApiFetch } from "../../config/adalConfig";
import NavBarAnother from "../presentationals/NavBar/NavBarAnother";
import Table from "react-bootstrap/Table";
import { Alert } from "react-bootstrap";
import Loading from "../presentationals/Loading";
import * as checkApi from "../../api/processChecksApi";

function Approval({ history, ...props }) {
  const user = authContext.getCachedUser();
  const serviceName = props.location.state.serviceName;
  const clientId = props.location.state.clientId;
  const environment = props.location.state.environment;
  const requestedBy = props.location.state.requestedBy;
  const clientDescription = props.location.state.clientDescription;
  const [akvDomainAccountKey, setAkvDomainAccountKey] = useState("");
  const [sapUsername, setSapUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const [message, setMessage] = useState("Client Onboarded");

  function handleFirstText(event) {
    setAkvDomainAccountKey(event.target.value);
  }

  function handleSecondText(event) {
    setSapUsername(event.target.value);
  }

  function buttonClick(e) {
    setLoaded(false);

    let akvInput = akvDomainAccountKey.trim();
    let sapUserInput = sapUsername.trim();
    if (akvInput === "" || sapUserInput === "") {
      setLoaded(true);
      setMessage("Please fill all the input fields");
      return;
    }
    setLoading(true);
    setDisableInput(true);

    let data = {
      serviceName: serviceName,
      clientId: clientId,
      AKVDomainAccountKey: akvInput,
      SAPUsername: sapUserInput,
      lastModifiedBy: user.userName
    };

    adalApiFetch(
      fetch,
      "https://hawkbackend.azurewebsites.net/api/updatependingrequest",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.text())
      .then(
        result => {
          console.log(result);
          setLoading(false);
          setLoaded(true);
          setMessage("Client Onboarded");
          setTimeout(() => {
            history.push({
              pathname: "/pendingapprovals"
            });
          }, 1000);
        },
        error => {
          setLoading(false);
          setLoaded(true);
          setMessage("There was an error onboarding client");

          console.log(error);
        }
      );
  }

  return (
    <div>
      <NavBarAnother />
      <div className="container" data-test="approvalComponent">
        <div className="row">
          <div className="col" />
          <div className="col-9">
            <Table
              responsive
              className="approveTableBody"
              data-test="approveTableBody"
            >
              <thead>
                <tr data-test="approveTableRow">
                  <th>Options</th>
                  <th className="borderLeft">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr data-test="approveTableRow">
                  <td>Service Name</td>
                  <td className="borderLeft">{serviceName}</td>
                </tr>
                <tr data-test="approveTableRow">
                  <td>ClientId:</td>
                  <td className="borderLeft">{clientId}</td>
                </tr>
                <tr data-test="approveTableRow">
                  <td>Environment:</td>
                  <td className="borderLeft">{environment}</td>
                </tr>
                <tr data-test="approveTableRow">
                  <td>RequestedBy:</td>
                  <td className="borderLeft">{requestedBy}</td>
                </tr>
                <tr data-test="approveTableRow">
                  <td>Client Description:</td>
                  <td className="borderLeft">{clientDescription}</td>
                </tr>
                <tr data-test="approveTableRow">
                  <td> AKVDomainAccountKey:</td>
                  <td className="borderLeft">
                    <input
                      disabled={disableInput}
                      onChange={handleFirstText}
                      type="text"
                      className="form-control"
                      id="usr"
                    />
                  </td>
                </tr>
                <tr data-test="approveTableRow">
                  <td> SAPUsername::</td>
                  <td className="borderLeft">
                    <input
                      disabled={disableInput}
                      onChange={handleSecondText}
                      type="text"
                      className="form-control"
                      id="usr"
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="col" />
        </div>
        <div className="row">
          <div className="col" />
          <div className="col">
            <Alert variant="primary" show={loading}>
              <Loading />
            </Alert>
            <Alert variant="primary" show={loaded}>
              {message}
            </Alert>
            <button onClick={buttonClick} className="buttonstyle btn">
              Approve
            </button>
          </div>
          <div className="col" />
        </div>
      </div>
    </div>
  );
}

Approval.propTypes = {
  location: PropTypes.object
};

export default Approval;
