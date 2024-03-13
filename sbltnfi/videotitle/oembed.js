const getTitle = async (videoID) =>
  GM_xmlhttpRequestPromise(`https://www.youtube.com/oembed?url=youtube.com/watch?v=${videoID}&format=json`, {
      responseType: "json",
      timeout: 10000,
    })
    .then(responseObject => responseObject?.response?.title);