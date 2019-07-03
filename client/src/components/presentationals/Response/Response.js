import React from "react";
import PropTypes from "prop-types";

import { initializeIcons } from "@uifabric/icons";
initializeIcons();
import { Icon } from "office-ui-fabric-react/lib/Icon";

import { Text } from "office-ui-fabric-react/lib/Text";
import { Stack } from "office-ui-fabric-react/lib/Stack";

const AcceptIcon = () => (
  <Icon
    iconName="CompletedSolid"
    className="ms-IconExample"
    style={{ color: "#107c10" }}
    title="Success"
  />
);
const ErrorIcon = () => (
  <Icon
    iconName="StatusErrorFull"
    className="ms-IconExample "
    title="Error"
    style={{ color: "#750b1c" }}
  />
);

const Response = props => (
  <div>
    <Stack>
      <Stack.Item align="center">
        <Text block variant={"xxLarge"}>
          {props.response.status === true ? (
            <AcceptIcon data-test="statustrue" />
          ) : (
            <ErrorIcon data-test="statusfalse" />
          )}
        </Text>
      </Stack.Item>
    </Stack>
  </div>
);

Response.propTypes = {
  response: PropTypes.object.isRequired
};

export default Response;
