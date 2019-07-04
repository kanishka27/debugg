import React from "react";
import { configure } from "enzyme";
import { shallow, render, mount } from "enzyme";

import checkPropTypes from "check-prop-types";

import Adapter from "enzyme-adapter-react-16";
import RootPage from "../components/RootPage";
configure({ adapter: new Adapter() });

const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test="${attr}"]`);
  console.log(component.debug());
  return wrapper;
};

const setUp = props => {
  const component = render(<RootPage {...props} />);
  console.log(component.debug());
  return component;
};

// describe("Correct Rendering ", () => {
//   let component;

//   it("Should render homepage", () => {
//     const props = {
//       submitForm: () => {},
//       updateUrl: () => {},
//       updateAccessToken: () => {},
//       checkStatus: () => {},
//       resetForm: () => {},
//       resetParams: () => {}
//     };
//     component = setUp(props);

//     const wrapper = findByTestAttr(component, "homePage");
//     expect(wrapper.length).toBe(1);
//   });
// });

describe("Check PropTypes", () => {
  it("Should not throw a warning ", () => {
    const expectedProps = {
      submitForm: () => {},
      updateUrl: () => {},
      updateAccessToken: () => {},
      checkStatus: () => {},
      resetForm: () => {},
      resetParams: () => {}
    };

    const propsErr = checkPropTypes(
      RootPage.PropTypes,
      expectedProps,
      "props",
      RootPage.name
    );
    expect(propsErr).toBeUndefined();
  });
});
