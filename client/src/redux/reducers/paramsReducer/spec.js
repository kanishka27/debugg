import { types } from "./../../actions/actionTypes";

import paramsReducer from "./paramsReducer";
import initialState from "./../initialState";

describe("ParamsReducer", () => {
  it("Should Return Initial State", () => {
    const newState = paramsReducer(initialState.params, {});
    expect(newState).toEqual(initialState.params);
  });

  it("Should update clientID", () => {
    const clientId = "3456656";
    const output = {
      url: "",
      accessToken: "",
      clientId: "3456656",
      domainAccountKey: "",

      environment: "",

      resourceId: "",
      sapService: "",
      sapSystem: "",
      sapUsername: ""
    };

    const newState = paramsReducer(initialState.params, {
      type: types.UPDATE_CLIENT_ID,
      clientId
    });
    expect(newState).toEqual(output);
  });

  it("Should update domainKey", () => {
    const domainAccountKey = "AAKUFRNNMFM";
    const output = {
      url: "",
      accessToken: "",
      clientId: "",
      domainAccountKey: "AAKUFRNNMFM",

      environment: "",

      resourceId: "",
      sapService: "",
      sapSystem: "",
      sapUsername: ""
    };

    const newState = paramsReducer(initialState.params, {
      type: types.UPDATE_DOMAIN_KEY,
      domainAccountKey
    });
    expect(newState).toEqual(output);
  });

  it("Should update environment", () => {
    const environment = "production";
    const output = {
      url: "",
      accessToken: "",
      clientId: "",
      domainAccountKey: "",

      environment: "production",

      resourceId: "",
      sapService: "",
      sapSystem: "",
      sapUsername: ""
    };

    const newState = paramsReducer(initialState.params, {
      type: types.UPDATE_ENVIRONMENT,
      environment
    });
    expect(newState).toEqual(output);
  });

  it("Should update service", () => {
    const sapService = "xyz";
    const output = {
      url: "",
      accessToken: "",
      clientId: "",
      domainAccountKey: "",

      environment: "",
      resourceId: "",
      sapService: "xyz",
      sapSystem: "",
      sapUsername: ""
    };

    const newState = paramsReducer(initialState.params, {
      type: types.UPDATE_SERVICE,
      sapService
    });
    expect(newState).toEqual(output);
  });

  it("Should update system", () => {
    const sapSystem = "abcd";
    const output = {
      url: "",
      accessToken: "",
      clientId: "",
      domainAccountKey: "",

      environment: "",
      resourceId: "",
      sapService: "",
      sapSystem: "abcd",
      sapUsername: ""
    };

    const newState = paramsReducer(initialState.params, {
      type: types.UPDATE_SYSTEM,
      sapSystem
    });
    expect(newState).toEqual(output);
  });

  it("Should update Url", () => {
    const url = "http://client_id";
    const output = {
      url: url,
      accessToken: "",
      clientId: "",
      domainAccountKey: "",

      environment: "",
      resourceId: "",
      sapService: "",
      sapSystem: "",
      sapUsername: ""
    };

    const newState = paramsReducer(initialState.params, {
      type: types.UPDATE_URL,
      url
    });
    expect(newState).toEqual(output);
  });

  it("Should update AccessToken", () => {
    const accessToken = "k0229i09inmlfc";
    const output = {
      url: "",
      accessToken: accessToken,
      clientId: "",
      domainAccountKey: "",

      environment: "",
      resourceId: "",
      sapService: "",
      sapSystem: "",
      sapUsername: ""
    };

    const newState = paramsReducer(initialState.params, {
      type: types.UPDATE_ACCESS_TOKEN,
      accessToken
    });
    expect(newState).toEqual(output);
  });

  it("Should update resTd", () => {
    const resourceId = "8999007";
    const output = {
      url: "",
      accessToken: "",
      clientId: "",
      domainAccountKey: "",
      environment: "",
      resourceId: "8999007",
      sapService: "",
      sapSystem: "",
      sapUsername: ""
    };

    const newState = paramsReducer(initialState.params, {
      type: types.UPDATE_RES_ID,
      resourceId
    });
    expect(newState).toEqual(output);
  });

  it("Should update SAPusername", () => {
    const sapUsername = "extxjx";
    const output = {
      url: "",
      accessToken: "",
      clientId: "",
      domainAccountKey: "",
      environment: "",
      resourceId: "",
      sapService: "",
      sapSystem: "",
      sapUsername: "extxjx"
    };

    const newState = paramsReducer(initialState.params, {
      type: types.UPDATE_SAP_USERNAME,
      sapUsername
    });
    expect(newState).toEqual(output);
  });
});
