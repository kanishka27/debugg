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
import Users from "./components/Users";
import Approval from "./components/Approval";
import Null from "./components/Null";
import { withAdalLoginApi } from "./config/adalConfig";

const ProtectedAppArea = withAdalLoginApi(Users);



const store = configureStore();
const ProtectedAppDashboard = withAdalLoginApi(Users);
const ProtectedAppTvboard = withAdalLoginApi(Approval);

// render(
//   <ReduxProvider store={store}>
//     <Router>
//       <Switch>
//         <Route exact path="/" component={App} />
//         <Route path="/user" component={ProtectedAppDashboard} />
//         <Route path="/approval" component={ProtectedAppTvboard} />
//         <Route path="/null" component={Null} />
//       </Switch>
//     </Router>
//   </ReduxProvider>,
//   document.getElementById("root")
// );

function indexApp() {
  const ProtectedAppDashboard = withAdalLoginApi(Users);
  const ProtectedAppTvboard = withAdalLoginApi(Approval);

  return (
    <ReduxProvider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/user" component={ProtectedAppDashboard} />
          <Route path="/approval" component={ProtectedAppTvboard} />
          <Route path="/null" component={Null} />
        </Switch>
      </Router>
    </ReduxProvider>
  );
}

export default indexApp;
