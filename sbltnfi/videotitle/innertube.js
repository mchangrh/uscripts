const getTitle = async (videoID) => {
  const itRequest = JSON.stringify({
    context: {
      client: {
        clientName: "WEB",
        clientVersion: "2.20230327.07.00"
      }
    },
    videoId: videoID,
  });
  return GM_xmlhttpRequestPromise("https://www.youtube.com/youtubei/v1/player", {
      method: "POST",
      responseType: "json",
      data: itRequest,
      timeout: 10000,
    })
    .then(responseObject => responseObject?.response?.videoDetails?.title);
};