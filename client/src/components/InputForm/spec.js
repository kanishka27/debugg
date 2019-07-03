import React from "react";
import { shallow, configure, mount } from "enzyme";
//import { findByTestAttr } from "./../../../Utils";
import Inputform from "./InputsForm";
import checkPropTypes from "check-prop-types";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const setUp = props => {
  const component = mount(<Inputform {...props} />);

  return component;
};

const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test="${attr}"]`);
  return wrapper;
};

describe(" Input Component", () => {
  let component;
  beforeEach(() => {
    const props = {
      url: "check",
      accessToken: "678890",
      onSave: () => {},
      movDiv: () => {},
      onChange: () => {},
      processing: false
    };
    component = setUp(props);
  });

  it(" It should render without errors", () => {
    const wrapper = findByTestAttr(component, "urlInput");

    expect(wrapper.length).toBe(3);
  });

  it(" It should render without errors", () => {
    const wrapper = findByTestAttr(component, "AADInput");

    expect(wrapper.length).toBe(3);
  });

  it("Should render a button", () => {
    const button = findByTestAttr(component, "SubmitButton");
    expect(button.length).toBe(1);
  });
});

describe("Check PropTypes", () => {
  it("Should not throw a warning ", () => {
    const expectedProps = {
      url: "abc",
      accesstoken: "9876",
      onSave: () => {},
      onChange: () => {},
      processing: false
    };

    const propsErr = checkPropTypes(
      Inputform.PropTypes,
      expectedProps,
      "props",
      Inputform.name
    );
    expect(propsErr).toBeUndefined();
  });
});
