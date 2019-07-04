import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, render } from "enzyme";
import Pagination from "./Pagination";
import { findByTestAttr, checkProps } from "../../Utils";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<Pagination {...props} />);
  return component;
};

const listener = () => {
  console.log("Just a Test");
};

describe("Pagination Component", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        currPage: 1,
        clickListener: listener,
        numbers: [1, 2, 3]
      };
      const propsErr = checkProps(Pagination, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe("Have props", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        currPage: 1,
        clickListener: listener,
        numbers: [1, 2, 3]
      };
      wrapper = setUp(props);
    });
    it("Should render without errors", () => {
      const component = findByTestAttr(wrapper, "paginationComponent");
      expect(component.length).toBe(1);
    });

    it("Should render without errors (wraps of pagination)", () => {
      const component = findByTestAttr(wrapper, "paginationComponentBody");
      expect(component.length).toBe(3);
    });
  });
  describe("Have No Props", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setUp();
    });
    it("Should not render", () => {
      const component = findByTestAttr(wrapper, "paginationComponent");
      expect(component.length).toBe(0);
    });
  });
});
