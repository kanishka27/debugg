import { types } from "./../../actions/actionTypes";

import checkReducer from "./checkReducer";
import initialState from "./../initialState";

describe("CheckReducer", () => {
  it("Should Return Initial State", () => {
    const newState = checkReducer(initialState.checkStatus, {});
    expect(newState).toEqual(initialState.checkStatus);
  });

  it("Should Return new state type checkstart ", () => {
    const check = {
      isLoading: true,
      aborted: false,
      response: null,
      dependent: -1
    };

    const result = [
      { id: 0, isLoading: true, response: null, aborted: false },
      { id: 1, isLoading: false, response: null, aborted: false },
      { id: 2, isLoading: false, response: null, aborted: false },
      { id: 3, isLoading: false, response: null, aborted: false },
      { id: 4, isLoading: false, response: null, aborted: false },
      { id: 5, isLoading: false, response: null, aborted: false },
      { id: 6, isLoading: false, response: null, aborted: false },
      { id: 7, isLoading: false, response: null, aborted: false }
    ];

    const newState = checkReducer(initialState.checkStatus, {
      type: types.CHECK_START,
      check: check
    });
    expect(newState).toEqual(result);
  });

  it("Should Change state on receiving response ", () => {
    const checkIdentifier = 1;

    const response = {
      success: false,
      result: "abc"
    };

    const output = [
      { id: 0, isLoading: false, aborted: false, response: null },
      { id: 1, isLoading: false, aborted: false, response: response },
      { id: 2, isLoading: false, aborted: false, response: null },
      { id: 3, isLoading: false, aborted: false, response: null },
      { id: 4, isLoading: false, aborted: false, response: null },
      { id: 5, isLoading: false, aborted: false, response: null },
      { id: 6, isLoading: false, aborted: false, response: null },
      { id: 7, isLoading: false, aborted: false, response: null }
    ];

    const newState = checkReducer(initialState.checkStatus, {
      type: types.CHECK_LOAD_SUCCESS,
      response,
      checkIdentifier
    });
    expect(newState).toEqual(output);
  });

  it("Should change detect failure ", () => {
    const demotrue = {
      status: true,
      result: {
        message: "successful"
      }
    };

    const response = {
      status: false,
      result: {
        message: "There was an error"
      }
    };
    const checkIdentifier = 3;

    const initial = [
      { id: 0, isLoading: false, aborted: false, response: demotrue },
      { id: 1, isLoading: false, aborted: false, response: demotrue },
      { id: 2, isLoading: false, aborted: false, response: demotrue },
      { id: 3, isLoading: true, aborted: false, response: null },
      { id: 4, isLoading: false, aborted: false, response: null },
      { id: 5, isLoading: false, aborted: false, response: null },
      { id: 6, isLoading: false, aborted: false, response: null },
      { id: 7, isLoading: false, aborted: false, response: null }
    ];

    const output = [
      { id: 0, isLoading: false, aborted: false, response: demotrue },
      { id: 1, isLoading: false, aborted: false, response: demotrue },
      { id: 2, isLoading: false, aborted: false, response: demotrue },
      { id: 3, isLoading: true, aborted: false, response: response },
      { id: 4, isLoading: false, aborted: false, response: null },
      { id: 5, isLoading: false, aborted: false, response: null },
      { id: 6, isLoading: false, aborted: false, response: null },
      { id: 7, isLoading: false, aborted: false, response: null }
    ];

    const newState = checkReducer(initial, {
      type: types.CHECK_LOAD_FAILURE,
      response,
      checkIdentifier
    });
    expect(newState).toEqual(output);
  });

  it("  Terminate Check", () => {
    const demotrue = {
      status: true,
      result: {
        message: "successful"
      }
    };

    const id = 1;

    const initial = [
      { id: 0, isLoading: false, aborted: false, response: demotrue },
      { id: 1, isLoading: true, aborted: false, response: null },
      { id: 2, isLoading: false, aborted: false, response: null },
      { id: 3, isLoading: false, aborted: false, response: null },
      { id: 4, isLoading: false, aborted: false, response: null },
      { id: 5, isLoading: false, aborted: false, response: null },
      { id: 6, isLoading: false, aborted: false, response: null },
      { id: 7, isLoading: false, aborted: false, response: null }
    ];

    const output = [
      { id: 0, isLoading: false, aborted: false, response: demotrue },
      { id: 1, isLoading: false, aborted: false, response: null },
      { id: 2, isLoading: false, aborted: false, response: null },
      { id: 3, isLoading: false, aborted: false, response: null },
      { id: 4, isLoading: false, aborted: false, response: null },
      { id: 5, isLoading: false, aborted: false, response: null },
      { id: 6, isLoading: false, aborted: false, response: null },
      { id: 7, isLoading: false, aborted: false, response: null }
    ];

    const newState = checkReducer(initial, {
      type: types.TERMINATE_CHECK,
      id
    });
    expect(newState).toEqual(output);
  });

  it("Abort Checks", () => {
    const demotrue = {
      status: true,
      result: {
        message: "successful"
      }
    };
    const demofalse = {
      status: false,
      result: {
        message: "failed"
      }
    };

    const check = {
      isLoading: false,
      aborted: true,
      response: {
        status: false,
        result: {
          message: "Aborted"
        }
      },
      dependent: 0
    };

    const initial = [
      { id: 0, isLoading: false, aborted: false, response: demotrue },
      { id: 1, isLoading: false, aborted: false, response: null },
      { id: 2, isLoading: true, aborted: false, response: null },
      { id: 3, isLoading: true, aborted: false, response: null },
      { id: 4, isLoading: false, aborted: false, response: null },
      { id: 5, isLoading: false, aborted: false, response: null },
      { id: 6, isLoading: false, aborted: false, response: null },
      { id: 7, isLoading: false, aborted: false, response: null }
    ];

    const output = [
      { id: 0, isLoading: false, aborted: false, response: demotrue },
      { id: 1, isLoading: false, aborted: true, response: check.response },
      { id: 2, isLoading: false, aborted: true, response: check.response },
      { id: 3, isLoading: false, aborted: true, response: check.response },
      { id: 4, isLoading: false, aborted: false, response: null },
      { id: 5, isLoading: false, aborted: false, response: null },
      { id: 6, isLoading: false, aborted: false, response: null },
      { id: 7, isLoading: false, aborted: false, response: null }
    ];

    const newState = checkReducer(initial, {
      type: types.CHECK_START,
      check
    });
    expect(newState).toEqual(output);
  });

  it("Reset Checks", () => {
    const demotrue = {
      status: true,
      result: {
        message: "successful"
      }
    };
    const demofalse = {
      status: false,
      result: {
        message: "failed"
      }
    };

    const initial = [
      { id: 0, isLoading: false, aborted: false, response: demotrue },
      { id: 1, isLoading: false, aborted: false, response: demofalse },
      { id: 2, isLoading: true, aborted: false, response: demotrue },
      { id: 3, isLoading: true, aborted: false, response: null },
      { id: 4, isLoading: false, aborted: false, response: null },
      { id: 5, isLoading: true, aborted: false, response: null },
      { id: 6, isLoading: false, aborted: false, response: null },
      { id: 7, isLoading: false, aborted: false, response: demotrue }
    ];

    const newState = checkReducer(initial, {
      type: types.RESET_CHECKS,
      action: true
    });
    expect(newState).toEqual(initialState.checkStatus);
  });
});
