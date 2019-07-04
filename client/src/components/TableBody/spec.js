import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, render } from "enzyme";
import TableBody from "./TableBody";
import { findByTestAttr, checkProps } from "../../Utils";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<TableBody {...props} />);
  //   console.log(component.debug());
  return component;
};

const listener = () => {
  console.log("Just a Test");
};

const tempData = {
  datas: [
    {
      PartitionKey: "test",
      RowKey: "test",
      Environment: "test",
      EmailId: "test",
      AADClientDescription: "test"
    },
    {
      PartitionKey: "test",
      RowKey: "test",
      Environment: "test",
      EmailId: "test",
      AADClientDescription: "test"
    },
    {
      PartitionKey: "test",
      RowKey: "test",
      Environment: "test",
      EmailId: "test",
      AADClientDescription: "test"
    }
  ],
  startPoint: 0,
  endPoint: 3,
  clickListener: listener
};

describe("TableBody Component", () => {
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = tempData;
      const propsErr = checkProps(TableBody, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe("Have props", () => {
    let wrapper;
    beforeEach(() => {
      const props = tempData;
      wrapper = setUp(props);
    });
    it("Should render without errors", () => {
      const component = findByTestAttr(wrapper, "tableBodyComponent");
      expect(component.length).toBe(1);
    });

    it("Should render without errors (rows of table)", () => {
      const component = findByTestAttr(wrapper, "tableRowComponent");
      expect(component.length).toBe(3);
    });
  });

  describe("Have No Props", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setUp();
    });
    it("Should not render", () => {
      const component = findByTestAttr(wrapper, "tableBodyComponent");
      expect(component.length).toBe(0);
    });
  });
});
