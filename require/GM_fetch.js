const GM_xmlhttpRequestPromise = (url, options = {}) => new Promise((resolve, reject) => GM_xmlhttpRequest({
    method: "GET",
    url,
    ...options,
    onload: response => resolve(response),
    onerror: error => reject(error)
  })
);