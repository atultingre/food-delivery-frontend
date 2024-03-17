// API request function
const API_URL = "http://localhost:5000/api";

export async function makeAPIRequest(endpoint, method = "GET", data = null) {
  const url = `${API_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Something went wrong");
    }
    return responseData;
  } catch (error) {
    throw error;
  }
}
