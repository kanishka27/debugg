import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text } from "office-ui-fabric-react/lib/Text";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import "./../../index.css";
import LinesEllipsis from "react-lines-ellipsis";

const tokens = {
  sectionStack: {
    childrenGap: 10
  },
  headingStack: {
    childrenGap: 5
  },
  customSpacing: {
    childrenGap: "5%"
  }
};

// const [accessToken, setAccessToken] = useState("");

// const handleClick = () => {
//   if (showText === "See More") {
//     setAccessToken(input.accessToken);
//     setShowText("Show Less");
//   } else {
//     setAccessToken(input.accessToken.substring(0, 100));
//     setShowText("Show More");
//   }
// };

const InputHeader = props => (
  <div className="row " style={{ flexDirection: "row" }}>
    <div
      className="col-md-12 col-xs-12 col-sm-12 topspace"
      style={{ flex: 1, flexWrap: "wrap", flexShrink: 1 }}
    >
      <Stack tokens={tokens.sectionStack}>
        <Stack tokens={tokens.headingStack} />
        <Stack.Item align="center">
          <Text
            block
            variant={"large"}
            style={{ fontWeight: "375" }}
            style={{ flex: 1, flexWrap: "wrap" }}
          >
            <strong> Url </strong>: {props.input.url}
            <br />
            <strong>AccessToken </strong>:{props.input.accessToken}
            {/* <div className="line-breaks">{accessToken} </div> */}
            {/* <a href="javascript:void(0)" onClick={handleClick}>
              {showText}
            </a> */}
          </Text>
        </Stack.Item>
      </Stack>
    </div>
  </div>
);

InputHeader.propTypes = {
  input: PropTypes.object.isRequired
};

export default InputHeader;
