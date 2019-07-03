import React from "react";
import PropTypes from "prop-types";

import { initializeIcons } from "@uifabric/icons";
initializeIcons();

import Response from "./../Response";
import Loading from "./../Loading";
import Waiting from "./../Waiting";
import Aborted from "./../Aborted";

const StatusChecks = props =>
  props.status.aborted ? (
    <Aborted data-test="aborted-component" />
  ) : props.status.isLoading ? (
    <Loading data-test="loading-component" />
  ) : props.status.response == null ? (
    <Waiting data-test="waiting-component" />
  ) : (
    <Response data-test="response-component" response={props.status.response} />
  );

StatusChecks.propTypes = {
  status: PropTypes.object.isRequired
};

export default StatusChecks;
