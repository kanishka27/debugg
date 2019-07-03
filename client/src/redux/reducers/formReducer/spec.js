import { types } from "./../../actions/actionTypes";

import formReducer from "./formReducer";
import initialState from "./../initialState";

describe("FormReducer", () => {
  it("Should Return Initial State", () => {
    const newState = formReducer(initialState.form, {});
    expect(newState).toEqual(initialState.form);
  });

  it("Should Return inputs on submit ", () => {
    const input = {
      url: "https://checktoken",
      accessToken: "68475t8jvnhxcfbmbmk"
    };

    const output = {
      input: {
        url: "https://checktoken",
        accessToken: "68475t8jvnhxcfbmbmk"
      },
      submitted: false
    };

    const newState = formReducer(initialState.form, {
      type: types.SUBMIT_FORM,
      input
    });

    expect(newState).toEqual(output);
  });

  it("Should SET SUBMITTED", () => {
    const initState = {
      input: {
        url: "",
        accessToken: ""
      },
      submitted: false
    };

    const output = {
      input: {
        url: "",
        accessToken: ""
      },
      submitted: true
    };

    const newState = formReducer(initState, {
      type: types.SET_SUBMITTED
    });
    expect(newState).toEqual(output);
  });

  it("Should UNSET SUBMITTED", () => {
    const initState = {
      input: {
        url: "",
        accessToken: ""
      },
      submitted: true
    };

    const output = {
      input: {
        url: "",
        accessToken: ""
      },
      submitted: false
    };

    const newState = formReducer(initState, {
      type: types.UNSET_SUBMITTED
    });
    expect(newState).toEqual(output);
  });

  it("Should reset the form", () => {
    const initState = {
      input: {
        url: "https://checktoken",
        accessToken: "68475t8jvnhxcfbmbmk"
      },
      submitted: "false"
    };

    const output = {
      input: {
        url: "",
        accessToken: ""
      },
      submitted: "false"
    };

    const newState = formReducer(initState, {
      type: types.RESET_FORM
    });
    expect(newState).toEqual(output);
  });
});
