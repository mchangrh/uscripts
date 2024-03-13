const getTitle = async (videoID) => {
  const dearrowTitle = await GM_xmlhttpRequestPromise(`https://sponsor.ajay.app/api/branding?videoID=${videoID}`, {
      responseType: "json",
      timeout: 10000,
    });
  const oembedTitle = await GM_xmlhttpRequestPromise(`https://www.youtube.com/oembed?url=youtube.com/watch?v=${videoID}&format=json`, {
      responseType: "json",
      timeout: 10000,
    });
  return dearrowTitle?.response?.titles?.[0]?.title || oembedTitle?.response?.title;
};