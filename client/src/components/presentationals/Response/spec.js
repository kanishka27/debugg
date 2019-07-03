import React from "react";
import { shallow, configure } from "enzyme";
import Response from "./Response";
import checkPropTypes from "check-prop-types";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test="${attr}"]`);
  return wrapper;
};

const setUp = props => {
  const component = shallow(<Response {...props} />);

  return component;
};

describe("Result of check", () => {
  let component;

  it("Should render accept icon", () => {
    const props = {
      response: { result: { message: "Url is correct " }, status: true }
    };
    component = setUp(props);

    const wrapper = findByTestAttr(component, "statustrue");
    expect(wrapper.length).toBe(1);
  });

  it("Should render error icon", () => {
    const props = {
      response: { result: { message: "Url is incorrect " }, status: false }
    };
    component = setUp(props);

    const wrapper = findByTestAttr(component, "statusfalse");
    expect(wrapper.length).toBe(1);
  });

  //describe("Have Props", () => {});

  describe(" Check PropTypes", () => {
    it("Should not throw warning ", () => {
      const expectedProps = {
        response: { result: { message: "url true" }, status: true }
      };

      const propsErr = checkPropTypes(
        Response.propTypes,
        expectedProps,
        "props",
        Response.name
      );

      expect(propsErr).toBeUndefined();
    });
  });
});
