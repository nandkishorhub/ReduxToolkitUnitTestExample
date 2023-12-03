const host = "http://localhost:5000";

// Common api call service
const remoteCall = async (apiData) => {
  const response = await fetch(host + apiData.url, {
    method: apiData.method,
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
    body: apiData.body ? JSON.stringify(apiData.body) : null,
  });
  console.log(response);
  const jsonData = await response.json();
  return jsonData;
};

export default remoteCall;