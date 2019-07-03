export function handleResponse(response) {
  console.log("Response code :", response.status);
  //console.log("response: ", response.json());
  if (response.ok) return response.json();
  if (response.status === 400 || response.status === 500) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = "Server side error!!";
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
export function handleException(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}
