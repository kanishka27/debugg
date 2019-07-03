import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import RootPage from "./RootPage";
import { createBrowserHistory } from "history";
import { ai } from "./../TelemetryService";
import Users from "./Users";
import NotFound from "./NotFound";
import Approval from "./Approval";
import { withAdalLoginApi } from "../config/adalConfig";

const history = createBrowserHistory({ basename: "" });
ai.initialize({ history: history });


class App extends React.Component {
  render() {
    return (
      <div>
        <RootPage />
      </div>
    );
  }
}

export default App;
