import React from "react";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib-commonjs/Spinner";

const Loading = () => (
  <Spinner
    ariaLive="assertive"
    labelPosition="right"
    size={SpinnerSize.large}
  />
);

export default Loading;
