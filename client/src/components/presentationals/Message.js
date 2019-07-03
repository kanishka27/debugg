import React from "react";
import PropTypes from "prop-types";
import * as constants from "../../constants";
import { initializeIcons } from "@uifabric/icons";
initializeIcons();
import { withAITracking } from "@microsoft/applicationinsights-react-js";
import { ai } from "../../TelemetryService";
import { SeverityLevel } from "@microsoft/applicationinsights-web";

const arr = [
  "textarea0",
  "textarea1",
  "textarea2",
  "textarea3",
  "textarea4",
  "textarea5",
  "textarea6",
  "textarea7",
  "textarea8"
];

const arrbtn = [
  "toggleButton1",
  "toggleButton2",
  "toggleButton3",
  "toggleButton4",
  "toggleButton5",
  "toggleButton6",
  "toggleButton7",
  "toggleButton8",
  "toggleButton9"
];

var btnstatus = "more";
const Message = props => {
  if (props.status.response != null) {
    var text = props.status.response.result.message;

    var res = text.substring(0, 30) + "....";
    if (
      !props.status.response.status &&
      props.status.response.result.message != "Aborted"
    ) {
      if (constants.contacts[props.status.id] !== "") {
        if (
          constants.contacts[props.status.id] ===
          "https://eusapim.portal.azure-api.net"
        ) {
          text = text.concat(
            "<br /> Please click  <a href=",
            "https://eusapim.portal.azure-api.net",

            "> here </a> to onboard"
          );
        } else {
          text = text.concat(
            "<br /> Contact: <strong>",
            constants.contacts[props.status.id],
            "</strong>"
          );
        }
      }
    }
  }
  const trackEvent = () =>
    ai.appInsights.trackEvent({ name: "Found Error with User" });
  // if (status.response.status === false) trackEvent();
  console.log(status);

  function toggleText() {
    console.log(btnstatus);

    if (btnstatus == "less") {
      document.getElementById(arr[props.status.id]).innerHTML = res;

      document.getElementById(arrbtn[props.status.id]).innerHTML = "See More";
      btnstatus = "more";
    } else if (btnstatus == "more") {
      document.getElementById(arr[props.status.id]).innerHTML = text;
      console.log(text);
      document.getElementById(arrbtn[props.status.id]).innerHTML = "See Less";
      btnstatus = "less";
    }
  }
  return (
    <div className="rowC">
      {text.length >= 30 ? (
        <div>
          <p id={arr[props.status.id]}>{res}</p>
          <a
            id={arrbtn[props.status.id]}
            onClick={toggleText}
            href="javascript:void(0);"
          >
            See More
          </a>
        </div>
      ) : (
        <span>
          <p id={arr[props.status.id]}>{text}</p>
        </span>
      )}
    </div>
  );
};

Message.propTypes = {
  status: PropTypes.object.isRequired
};

export default withAITracking(ai.reactPlugin, Message, "prrt");
