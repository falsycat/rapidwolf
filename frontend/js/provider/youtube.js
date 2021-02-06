/*
 * YouTube Data Provider
 * API details: "https://api.rakuten.net/ytdlfree/api/Youtube v3"
 */

import BaseProvider from './base.js';

export default class YouTubeProvider extends BaseProvider {
  constructor() {
    super("YouTube", "");
    this.count = 0;
  }
  fetch(keyword, callback) {
    if (this.downed) return;
    this.abortFetching();

    const count = this.count;
    fetch(`https://youtube-v31.p.rapidapi.com/search?q=${encodeURI(keyword)}&part=snippet%2Cid&regionCode=JP&maxResults=50`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": RAPIDWOLF_RAPIDAPI_KEY,
        "x-rapidapi-host": "youtube-v31.p.rapidapi.com"}})
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        console.error("YouTube API error: ", res.error);
        this.downed = true;
        return;
      }
      if (this.count !== count) {
        return;  /* drop results if fetch is aborted */
      }
      for (const i of res.items) {
        callback(
          this.createItem({
            title: i.snippet.title,
            url: "https://youtube.com/watch?v=" + i.id.videoId,
            thumb: i.snippet.thumbnails.default.url,
            date: new Date(i.snippet.publishTime),
          }));
      }
    })
    .catch(err => {
      console.error(err);
      this.downed = true;
    });
  }
  abortFetching() {
    ++this.count;
  }
};