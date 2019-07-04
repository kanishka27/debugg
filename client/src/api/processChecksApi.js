import { handleResponse, handleException } from "./apiUtils";

// function to make 'fetch' call to make get or post call to the api endpoints
// depending wheather the body is null or not respectively.
export async function getResponse(url, body, type, signal) {
  console.log(body);
  console.log(url);
  return type === "GET"
    ? await fetch(url, { signal })
        .then(handleResponse)
        .catch(handleException)
    : await fetch(url, {
        method: "post",
        body,
        headers: {
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        signal
      })
        .then(handleResponse)
        .catch(handleException);
}
