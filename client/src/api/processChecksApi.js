import { handleResponse, handleException } from "./apiUtils";

// function to make 'fetch' call to make get or post call to the api endpoints
// depending wheather the body is null or not respectively.
export async function getResponse(url, body, type) {
  console.log(body);
  console.log(url);
  return type === "GET"
    ? await fetch(url)
        .then(handleResponse)
        .catch(handleException)
    : await fetch(url, {
        method: "post",
        body,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(handleResponse)
        .catch(handleException);
}
