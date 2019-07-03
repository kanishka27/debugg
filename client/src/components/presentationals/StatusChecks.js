import React from "react";
import PropTypes from "prop-types";

import { initializeIcons } from "@uifabric/icons";
initializeIcons();

import Response from "./Response";
import Loading from "./Loading";
import Waiting from "./Waiting";
import Aborted from "./Aborted";

const StatusChecks = props =>
  props.status.aborted ? (
    <Aborted />
  ) : props.status.isLoading ? (
    <Loading />
  ) : props.status.response == null ? (
    <Waiting />
  ) : (
    <Response response={props.status.response} />
  );

StatusChecks.propTypes = {
  status: PropTypes.object.isRequired
};

export default StatusChecks;
