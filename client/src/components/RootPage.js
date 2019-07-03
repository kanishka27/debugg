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
  checkStatus,
  resetForm,
  resetParams
}) => {
  const [input, setInput] = useState({
    url: "",
    accessToken: ""
  });

  const [processing, setProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  var btnstatus = "more";

  function toggleText() {
    if (btnstatus == "less") {
      console.log("hey");
      document.getElementById("aad").innerHTML = "";

      document.getElementById("link").innerHTML = "See More";
      btnstatus = "more";
    } else if (btnstatus == "more") {
      document.getElementById("aad").innerHTML =
        input.accessToken.substring(500, 600) +
        "<br />" +
        input.accessToken.substring(600, 700) +
        "<br />" +
        input.accessToken.substring(700, 800) +
        "<br />" +
        input.accessToken.substring(800, 900) +
        "<br />" +
        input.accessToken.substring(900, 1000) +
        "<br />" +
        input.accessToken.substring(1000, 1025);

      document.getElementById("link").innerHTML = "See Less";
      btnstatus = "less";
    }
  }

  const renderoot = () => {
    setSubmitted(false);
    setInput({ url: "", accessToken: "" });
    resetForm();
    resetParams();
    setProcessing(false);
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
        setSubmitted(true);
        submitForm({ url, accessToken });
        updateUrl(url);
        updateAccessToken(accessToken);
      }
    } else {
      alert("Invalid input");
      setSubmitted(false);
    }
  };

  useEffect(() => {
    var process = false;
    checkStatus.forEach(status => {
      process = process || status.isLoading;
    });
    setProcessing(process);
  }, [checkStatus]);
  console.log(input.accessToken.length);

  return (
    <div>
      {submitted ? (
        <div>
          <NavbarHome renderoot={renderoot} />
          <div className="row ">
            <div className="col-md-12 col-xs-12 col-sm-12 topspace">
              <Stack tokens={tokens.sectionStack}>
                <Stack tokens={tokens.headingStack} />
                <Stack.Item align="center">
                  <Text block variant={"large"} style={{ fontWeight: "375" }}>
                    <strong> Url </strong>: {input.url}
                    <br />
                    <strong className="nobreak"> AccessToken </strong>:{" "}
                    {input.accessToken.substring(0, 100)}
                    <br />
                    {input.accessToken.substring(100, 200)}
                    <br />
                    {input.accessToken.substring(200, 300)}
                    <br />
                    {input.accessToken.substring(300, 400)}
                    <br />
                    {input.accessToken.substring(400, 500)}
                    <p id="aad" />
                    <a
                      id="link"
                      onClick={toggleText}
                      href="javascript:void(0);"
                    >
                      See More
                    </a>
                  </Text>
                </Stack.Item>
              </Stack>
            </div>
          </div>

          <ManageProcess submit={submitted} />
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
                  processing={processing}
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
  checkStatus: PropTypes.array.isRequired,
  resetForm: PropTypes.func.isRequired,
  resetParams: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    checkStatus: state.checkStatus
  };
}

const mapDispatchToProps = {
  submitForm: formActions.submitForm,
  updateUrl: paramsAction.updateUrl,
  updateAccessToken: paramsAction.updateAccessToken,
  resetForm: formActions.resetForm,
  resetParams: paramsAction.resetParams
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootPage);

withAITracking(RootPage);
