import checkPropTypes from "check-prop-types";

const findByTestAttr = (component, attr) => {
  const wrapper = component.find("${attr");
  return wrapper;
};

export const checkPropTypes = (component, expectedProps) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    "props",
    component.name
  );
};

export default findByTestAttr;
