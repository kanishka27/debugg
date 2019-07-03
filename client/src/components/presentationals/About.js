import React from "react";
import { Stack } from "office-ui-fabric-react/lib/Stack";

import { Text } from "office-ui-fabric-react/lib/Text";

const About = () => (
  <div className="ms-Grid" dir="ltr">
    <div className="ms-Grid-row">
      <div className="spaceoutAbout">
        <div className="ms-Grid-col col-lg-5 col-xs-12 col-sm-12">
          <Text style={{ fontSize: "35px", fontWeight: "120" }}>
            Run Diagnostic
          </Text>
          <br />
          <br />
          <Text style={{ fontSize: "20px", fontWeight: "160" }}>
            All you need to provide is URL and AAD Token
          </Text>
        </div>
      </div>
    </div>
  </div>
);

export default About;
