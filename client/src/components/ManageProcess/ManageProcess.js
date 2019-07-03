import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as checkActions from "../../redux/actions/checkActions";
import * as formActions from "../../redux/actions/formActions";
import initialState from "../../redux/reducers/initialState";
import * as constants from "../../constants";
import CheckContainer from "../checkContainer/CheckContainer";
import Table from "react-bootstrap/Table";
import { withAITracking } from "@microsoft/applicationinsights-react-js";
import { ai } from "../../TelemetryService";

function MoveDiv() {
  var elmnt = document.getElementById("TableDiv");
  console.log("hello");
  elmnt.scrollIntoView();
}

function ManageProcess({ checkStatus, actions, form }) {
  const [status, setStatus] = useState(initialState.checkStatus);
  useEffect(() => {
    var loop = 0;
    var wait = false;
    checkStatus.forEach(status => {
      wait = wait || status.isLoading;
    });
    if (wait) {
      const interval = setInterval(() => {
        var wait = false;
        checkStatus.forEach(status => {
          wait = wait || status.isLoading;
        });
        loop++;
        if (!wait || loop >= 10) {
          clearInterval(interval);
          actions.setSubmitted();
          actions.resetChecks();
          actions.startCheck({
            ...constants.START_CHECK,
            dependent: constants.INITIAL_CHECK
          });
        }
      }, 500);
    } else {
      actions.setSubmitted();
      actions.resetChecks();
      actions.startCheck({
        ...constants.START_CHECK,
        dependent: constants.INITIAL_CHECK
      });
    }
  }, []);

  useEffect(() => {
    if (form.submitted) {
      setStatus(checkStatus);
    } else {
      setStatus(initialState.checkStatus);
    }
  }, [checkStatus]);

  useEffect(() => {
    MoveDiv();
  }, []);

  return (
    <div id="TableDiv" className="container ">
      <Table responsive className="tablestyle">
        <thead>
          <tr>
            <th className="tdt1">Status</th>
            <th className="tdt2">Diagnostic Steps</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {status.length > 0 ? (
            status.map(element => {
              return <CheckContainer key={element.id} status={element} />;
            })
          ) : (
            <>nope</>
          )}
        </tbody>
      </Table>
    </div>
  );
}

ManageProcess.propTypes = {
  checkStatus: PropTypes.array.isRequired, //array having status object of all checks
  actions: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    checkStatus: state.checkStatus,
    form: state.form
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      startCheck: bindActionCreators(checkActions.startCheck, dispatch),
      resetChecks: bindActionCreators(checkActions.resetChecks, dispatch),
      setSubmitted: bindActionCreators(formActions.setSubmitted, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageProcess);
