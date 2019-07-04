import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount, render } from "enzyme";
import PendingApprovals from "./PendingApprovals";
import { findByTestAttr, checkProps } from "../../Utils";
import { BrowserRouter as Router } from "react-router-dom";
configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<PendingApprovals {...props} />);
  return component;
};

describe("PendingApprovals Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("It should render without errors", () => {
    const wrapper = findByTestAttr(component, "userComponent");
    expect(wrapper.length).toBe(1);
  });

  it("It should render without errors", () => {
    const wrapper = findByTestAttr(component, "tableComponent");
    expect(wrapper.length).toBe(1);
  });

  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {};
      const propsErr = checkProps(PendingApprovals, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });
  
});
