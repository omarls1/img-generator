async function fetchData(reqData, URL, method = "POST", AbortController) {
  let data;
  try {
    let reqOptions = {
      method: method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };

    if (reqData) reqOptions.body = JSON.stringify(reqData);

    let signal;
    if (AbortController) signal = { signal: AbortController.signal };
    const res = await fetch(URL, reqOptions, signal);

    data = await res.json();

    if (data.status === "fail" || data.status === "error") {
      return { data: null, error: data.message };
    }
  } catch {
    return { data: null, error: "Failed operation, please try again later 😥" };
  }

  return { data, error: null };
}

export { fetchData };
