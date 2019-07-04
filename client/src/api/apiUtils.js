export function handleResponse(response) {
  console.log("Response code :", response.status);
  //console.log("response: ", response.json());
  console.log(response);
  if (response.ok) return response.json();
  if (response.status === 400 || response.status === 500) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = "Server side error!!";
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

// TODO: log in application insights
export function handleException(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}
