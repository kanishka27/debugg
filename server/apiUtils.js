exports.handleResponse = response => {
  console.log(response);
  //console.log("response: ", response.json());
  if (response.ok) return response.json();
  throw new Error("Network response was not ok.");
};

// In a real app, would likely call an error logging service.
exports.handleException = error => {
  // eslint-disable-next-line no-console
  return { status: false, result: { message: error.message } };
};
