import React from "react";
import { shallow, configure, mount } from "enzyme";
import Message from "./Message";
import checkPropTypes from "check-prop-types";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test="${attr}"]`);
  return wrapper;
};

const setUp = props => {
  const component = mount(<Message {...props} />);

  return component;
};

describe("Message to be displayed", () => {
  let component;

  it("Should render short message", () => {
    const props = {
      status: {
        id: 1,
        isLoading: false,
        aborted: false,
        response: { result: { message: "Aborted" }, status: false }
      }
    };
    component = setUp(props);

    const wrapper = findByTestAttr(component, "shortMessage");
    expect(wrapper.length).toBe(1);
  });

  it("Should render complete message", () => {
    const props = {
      status: {
        id: 1,
        isLoading: false,
        aborted: false,
        response: {
          result: {
            message:
              "Url Validation failed  . Please check your Url and contact "
          },
          status: false
        }
      }
    };
    component = setUp(props);

    const wrapper = findByTestAttr(component, "CompleteMessage");
    expect(wrapper.length).toBe(1);
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
        Message.propTypes,
        expectedProps,
        "props",
        Message.name
      );

      expect(propsErr).toBeUndefined();
    });
  });
});
