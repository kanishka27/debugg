import React from "react";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import { initializeIcons } from "@uifabric/icons";
initializeIcons();
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Text } from "office-ui-fabric-react/lib/Text";

const ClockIcon = () => (
  <Icon
    iconName="SkypeCircleClock"
    className="ms-IconExample"
    title="Not Started"
    style={{ color: "#ffaa44" }}
  />
);

const Waiting = () => (
  <Stack>
    <Stack.Item align="center">
      <Text block variant={"xxLarge"}>
        <ClockIcon />
      </Text>
    </Stack.Item>
  </Stack>
);

export default Waiting;
