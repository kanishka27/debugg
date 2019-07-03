import React from "react";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import { initializeIcons } from "@uifabric/icons";
initializeIcons();
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Text } from "office-ui-fabric-react/lib/Text";

const AlertIcon = () => (
  <Icon
    iconName="AlertSolid"
    className="ms-IconExample"
    title="Aborted Check"
    style={{ color: "#ca5010" }}
  />
);

const Aborted = () => (
  <Stack>
    <Stack.Item align="center">
      <Text block variant={"xxLarge"}>
        <AlertIcon />
      </Text>
    </Stack.Item>
  </Stack>
);

export default Aborted;
