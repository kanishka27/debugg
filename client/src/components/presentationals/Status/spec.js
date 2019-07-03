import React from "react";
import { shallow, configure } from "enzyme";

import StatusChecks from "./StatusChecks";
import checkPropTypes from "check-prop-types";

import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test="${attr}"]`);

  return wrapper;
};

const setUp = props => {
  const component = shallow(<StatusChecks {...props} />);

  return component;
};

describe("Status of Checks ", () => {
  let component;

  describe("Have Props", () => {
    it("Should render aborted component", () => {
      const props = {
        status: { id: 1, isLoading: false, aborted: true, response: "abc" }
      };
      component = setUp(props);

      const wrapper = findByTestAttr(component, "aborted-component");
      expect(wrapper.length).toBe(1);
    });

    it("Should render loading button", () => {
      const props = {
        status: { id: 1, isLoading: true, aborted: false, response: null }
      };
      component = setUp(props);

      const wrapper = findByTestAttr(component, "loading-component");
      expect(wrapper.length).toBe(1);
    });

    it("Should render waiting button", () => {
      const props = {
        status: { id: 1, isLoading: false, aborted: false, response: null }
      };
      component = setUp(props);

      const wrapper = findByTestAttr(component, "waiting-component");
      expect(wrapper.length).toBe(1);
    });

    it("Should render the response", () => {
      const props = {
        status: {
          id: 1,
          isLoading: false,
          aborted: false,
          response: { result: { message: "url true" }, status: true }
        }
      };
      component = setUp(props);

      const wrapper = findByTestAttr(component, "response-component");
      expect(wrapper.length).toBe(1);
    });
  });

  describe(" Check PropTypes", () => {
    it("Should not throw warning ", () => {
      const expectedProps = {
        status: {
          id: 1,
          isLoading: false,
          aborted: false,
          response: { result: { message: "url true" }, status: true }
        }
      };

      const propsErr = checkPropTypes(
        StatusChecks.propTypes,
        expectedProps,
        "props",
        StatusChecks.name
      );

      expect(propsErr).toBeUndefined();
    });
  });
});
