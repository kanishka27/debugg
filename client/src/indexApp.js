import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import "./index.css";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import { createBrowserHistory } from "history";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { reactAI } from "react-appinsights";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import PendingApprovals from "./components/PendingApprovals/PendingApprovals";
import Approval from "./components/Approval/Approval";
import Null from "./components/Null";
import { withAdalLoginApi } from "./config/adalConfig";

const store = configureStore();

function indexApp() {
  return (
    <ReduxProvider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route
            path="/pendingapprovals"
            component={withAdalLoginApi(PendingApprovals)}
          />
          <Route path="/approval" component={withAdalLoginApi(Approval)} />
          <Route path="/null" component={Null} />
        </Switch>
      </Router>
    </ReduxProvider>
  );
}

export default indexApp;
