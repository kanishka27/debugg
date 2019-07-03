import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { TextField } from "office-ui-fabric-react/lib-commonjs";
import { withAITracking } from "@microsoft/applicationinsights-react-js";
import { ai } from "../../TelemetryService";
import { SeverityLevel } from "@microsoft/applicationinsights-web";

const InputForm = ({
  url,
  accessToken,
  onSave,
  movDiv,
  onChange,
  processing = false
}) => {
  const trackEvent = () => ai.appInsights.trackEvent({ name: "Submit Form" });
  const trackException = ex =>
    ai.appInsights.trackException({
      error: new Error("some error" + ex),
      severityLevel: SeverityLevel.Error
    });

  useEffect(() => {
    try {
      if (url.length < 4) throw new Error("Url entered is too short");
    } catch (ex) {
      trackException(ex);
    }
  }, [url]);

  return (
    <div className="row">
      <form className="container " onSubmit={onSave} onClick={movDiv}>
        <TextField
          label="URL"
          required
          value={url}
          name="url"
          placeholder="Enter your URL"
          onChange={onChange}
          className="formstyle spaceout"
          data-test="urlInput"
        />

        <TextField
          label="AAD Token"
          required
          name="accessToken"
          value={accessToken}
          placeholder="Enter your Token"
          onChange={onChange}
          className="formstyle spaceout"
          data-test="AADInput"
        />

        <button
          type="submit"
          disabled={processing}
          className="buttonstyle btn"
          onClick={trackEvent}
          data-test="SubmitButton"
        >
          {processing ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

InputForm.propTypes = {
  url: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,

  onChange: PropTypes.func.isRequired,
  processing: PropTypes.bool
};

export default withAITracking(ai.reactPlugin, InputForm, "prrt");
