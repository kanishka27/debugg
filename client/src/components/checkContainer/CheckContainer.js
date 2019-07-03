import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as checkActions from "../../redux/actions/checkActions";
import StatusChecks from "../presentationals/StatusChecks";
import { Text } from "office-ui-fabric-react/lib/Text";
import Message from "./../presentationals/Message";

import { CHECKS_NAME, ABORT_CHECK } from "../../constants";
import "./../../index.css";
import { FontSizes } from "@uifabric/fluent-theme/lib-commonjs/fluent/FluentType";

const CheckContainer = ({
  //Container component for every check
  status,
  loadCheck,
  startCheck,
  terminateCheck,
  params
}) => {
  useEffect(() => {
    if (status.isLoading && status.response == null) {
      loadCheck(status.id, params);
    } else if (status.isLoading) {
      startCheck({
        ...ABORT_CHECK,
        dependent: status.id
      });
      terminateCheck(status.id);
    }
  }, [status]);

  return (
    <tr>
      <td>{<StatusChecks status={status} />}</td>
      <td>
        <Text
          className="tabletext1"
          style={{
            fontSize: FontSizes.size18
          }}
        >
          {CHECKS_NAME[status.id]}
        </Text>
      </td>
      {status.response != null ? (
        <td>
          <Message status={status} data-test="message-component" />
        </td>
      ) : (
        <td />
      )}
    </tr>
  );
};

CheckContainer.propTypes = {
  status: PropTypes.object.isRequired,
  loadCheck: PropTypes.func.isRequired,
  startCheck: PropTypes.func.isRequired,
  terminateCheck: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    params: state.params
  };
}

const mapDispatchToProps = {
  loadCheck: checkActions.loadCheck,
  startCheck: checkActions.startCheck,
  terminateCheck: checkActions.terminateCheck
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckContainer);
