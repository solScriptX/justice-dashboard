class JusticeClient {
  constructor(baseURL) {
    // Ensure baseURL always ends with a single slash
    this.baseURL = baseURL.endsWith("/")
      ? baseURL
      : baseURL + "/";
  }

  normalize(endpoint) {
    // Remove any leading slash to avoid double-slashes
    if (endpoint.startsWith("/")) {
      return endpoint.substring(1);
    }
    return endpoint;
  }

  async fetchData(endpoint) {
    try {
      const clean = this.normalize(endpoint);
      const res = await fetch(`${this.baseURL}${clean}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("Backend error:", res.status, res.statusText);
        return [];
      }

      const json = await res.json();
      return json || [];
    } catch (err) {
      console.error("Fetch failed:", err);
      return [];
    }
  }

  async postData(endpoint, data) {
    try {
      const clean = this.normalize(endpoint);
      const res = await fetch(`${this.baseURL}${clean}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        console.error("Backend POST error:", res.status, res.statusText);
        return null;
      }

      return await res.json();
    } catch (err) {
      console.error("POST failed:", err);
      return null;
    }
  }
}

export default JusticeClient;
