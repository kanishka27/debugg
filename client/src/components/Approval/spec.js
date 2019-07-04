import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Approval from "./Approval";
import { findByTestAttr, checkProps } from "../../Utils";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<Approval {...props} />);
  return component;
};

describe("Approval Component", () => {
  let component;
  beforeEach(() => {
    const props = {
      location: {
        state: {
          serviceName: "test",
          clientId: "test",
          environment: "test",
          requestedBy: "test",
          clientDescription: "Test"
        }
      }
    };
    component = setUp(props);
  });

  it("It should render without errors", () => {
    const wrapper = findByTestAttr(component, "approvalComponent");
    expect(wrapper.length).toBe(1);
  });

  it("It should render without errors", () => {
    const wrapper = findByTestAttr(component, "approveTableBody");
    expect(wrapper.length).toBe(1);
  });

  it("It should render without errors", () => {
    const wrapper = findByTestAttr(component, "approveTableRow");
    expect(wrapper.length).toBe(8);
  });
});
