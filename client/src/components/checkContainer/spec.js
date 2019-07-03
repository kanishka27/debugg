import React from "react";
import { configure } from "enzyme";
import { shallow, mount, render } from "enzyme";
import CheckContainer from "./CheckContainer";
import checkPropTypes from "check-prop-types";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test="${attr}"]`);
  return wrapper;
};

const setUp = props => {
  console.log(props);
  const component = render(<CheckContainer {...props} />);
  console.log(component.debug());
  return component;
};

describe("CheckContainer", () => {
  let component;
  it("Should render message component on response", () => {
    const props = {
      status: {
        id: 1,
        isLoading: false,
        aborted: false,
        response: { result: { message: "Aborted" }, status: false }
      },
      loadCheck: () => {},

      startCheck: () => {},
      terminateCheck: () => {},
      params: {
        url: "",
        accessToken: "",
        clientId: "",
        domainAccountKey: "",
        sapService: "",
        environment: "",
        resourceId: "",
        sapUsername: ""
      }
    };
    component = setUp(props);

    const wrapper = findByTestAttr(component, "message-component");
    expect(wrapper.length).toBe(1);
  });
});

describe("Check PropTypes", () => {
  it("Should not throw a warning ", () => {
    const expectedProps = {
      status: {
        id: 1,
        isLoading: false,
        aborted: false,
        response: { result: { message: "Aborted" }, status: false }
      },
      loadCheck: () => {},

      startCheck: () => {},
      terminateCheck: () => {},
      params: {
        url: "",
        accessToken: "",
        clientId: "",
        domainAccountKey: "",
        sapSystem: "",
        sapService: "",
        environment: "",
        resourceId: "",
        sapUsername: ""
      }
    };

    const propsErr = checkPropTypes(
      CheckContainer.PropTypes,
      expectedProps,
      "props",
      CheckContainer.name
    );
    expect(propsErr).toBeUndefined();
  });
});
