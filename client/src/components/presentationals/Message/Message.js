import React, { useState } from "react";
import PropTypes from "prop-types";
import * as constants from "../../../constants";
import { initializeIcons } from "@uifabric/icons";
initializeIcons();
import { withAITracking } from "@microsoft/applicationinsights-react-js";
import { ai } from "../../../TelemetryService";
import ReactHtmlParser from "react-html-parser";

const Message = props => {
  if (props.status.response != null) {
    var completeMessage, shortMessage;
    completeMessage = props.status.response.result.message;

    if (completeMessage.length >= 25) {
      shortMessage = completeMessage.substring(0, 25) + "....";
    } else shortMessage = completeMessage;

    if (
      !props.status.response.status &&
      props.status.response.result.message != "Aborted"
    ) {
      if (constants.contacts[props.status.id] !== "") {
        if (
          constants.contacts[props.status.id] ===
          "https://eusapim.portal.azure-api.net"
        ) {
          completeMessage = completeMessage.concat(
            "\n",
            "Please click  <a href=",
            "https://eusapim.portal.azure-api.net",

            "> here </a> to onboard"
          );
        } else {
          completeMessage = completeMessage.concat(
            "\n",
            "Contact:  <strong>",
            constants.contacts[props.status.id],
            "</strong>"
          );
        }
      }
      if (completeMessage.length >= 25) {
        shortMessage = completeMessage.substring(0, 25) + "....";
      } else shortMessage = completeMessage;
    }

    var startText = "";
    if (completeMessage.length >= 25) startText = shortMessage;
    else startText = completeMessage;
  }

  const [textMessage, setTextMessage] = useState(startText);
  const [showText, setShowText] = useState("See More");
  // const trackEvent = () =>
  //   ai.appInsights.trackEvent({ name: "Found Error with User" });
  // // if (status.response.status === false) trackEvent();

  function handleMessageClick() {
    if (showText === "See More") {
      setTextMessage(completeMessage);
      setShowText("See Less");
    } else {
      setTextMessage(shortMessage);
      setShowText("See More");
    }
  }

  return (
    <div>
      <p className="display-linebreak">{ReactHtmlParser(textMessage)}</p>
      {completeMessage.length >= 25 ? (
        <a onClick={handleMessageClick} href="javascript:void(0);">
          {showText}
        </a>
      ) : (
        <div />
      )}
    </div>
  );
};

Message.propTypes = {
  status: PropTypes.object.isRequired
};

export default withAITracking(ai.reactPlugin, Message, "prrt");
