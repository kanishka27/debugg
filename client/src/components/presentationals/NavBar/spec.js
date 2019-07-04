import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, render } from "enzyme";
import NavBar from "./NavBarAnother";
import { findByTestAttr } from "../../../Utils";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<NavBar {...props} />);
  return component;
};

describe("NavBar Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("It should render without errors", () => {
    const wrapper = findByTestAttr(component, "logOut");
    expect(wrapper.length).toBe(1);
  });
});
