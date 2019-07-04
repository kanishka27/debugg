import React, { useState, useEffect, useRef } from "react";
import HomePage from "./InputForm/InputsForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ManageProcess from "./ManageProcess/ManageProcess";
import { withAITracking } from "react-appinsights";
import * as formActions from "../redux/actions/formActions";
import * as paramsAction from "../redux/actions/paramsAction";
import { Text } from "office-ui-fabric-react/lib/Text";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import AbortController from "abort-controller";
import * as checkActions from "../redux/actions/checkActions";
import InputsHeader from "./presentationals/InputHeader";

import NavbarHome from "./presentationals/NavbarHome";
import NavbarFirst from "./presentationals/NavbarFirst";

import "./../index.css";
import About from "./presentationals/About";

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

const RootPage = ({
  submitForm,
  updateUrl,
  updateAccessToken,
  resetForm,
  resetParams,
  resetChecks
}) => {
  const [input, setInput] = useState({
    url: "",
    accessToken: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [showText, setShowText] = useState("See More");
  const [controller, setController] = useState(new AbortController());

  const handleClick = () => {
    if (showText === "See More") {
      setAccessToken(input.accessToken);
      setShowText("Show Less");
    } else {
      setAccessToken(input.accessToken.substring(0, 100));
      setShowText("Show More");
    }
  };

  const renderoot = () => {
    controller.abort();
    resetChecks();
    setSubmitted(false);
    setInput({ url: "", accessToken: "" });
    resetForm();
    resetParams();
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const url = input.url.trim();
    const accessToken = input.accessToken.trim();
    if (url !== "" && accessToken !== "") {
      if (url.indexOf(" ") >= 0 || accessToken.indexOf(" ") >= 0) {
        alert("Invalid input");
      } else {
        setController(new AbortController());
        setSubmitted(true);
        setAccessToken(input.accessToken.substring(0, 100));
        submitForm({ url, accessToken });
        updateUrl(url);
        updateAccessToken(accessToken);
      }
    } else {
      alert("Invalid input");
      setSubmitted(false);
    }
  };

  return (
    <div>
      {submitted ? (
        <div>
          <NavbarHome renderoot={renderoot} />
          <InputsHeader input={input} />

          <ManageProcess submit={submitted} signal={controller.signal} />
        </div>
      ) : (
        <div>
          <NavbarFirst />
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <div className="col-md-12 col-xs-12 col-sm-12 topspace">
                <Stack tokens={tokens.sectionStack}>
                  <Stack tokens={tokens.headingStack} />
                  <Stack.Item align="center">
                    <Text block variant={"xxLarge"}>
                      Enter your details
                    </Text>
                  </Stack.Item>
                </Stack>

                <HomePage
                  onChange={handleChange}
                  onSave={handleSubmit}
                  url={input.url}
                  accessToken={input.accessToken}
                />
              </div>
            </div>
            <About />
          </div>
        </div>
      )}
    </div>
  );
};

RootPage.propTypes = {
  submitForm: PropTypes.func.isRequired,
  updateUrl: PropTypes.func.isRequired,
  updateAccessToken: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  resetParams: PropTypes.func.isRequired,
  resetChecks: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  submitForm: formActions.submitForm,
  updateUrl: paramsAction.updateUrl,
  updateAccessToken: paramsAction.updateAccessToken,
  resetForm: formActions.resetForm,
  resetParams: paramsAction.resetParams,
  resetChecks: checkActions.resetChecks
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootPage);

withAITracking(RootPage);
