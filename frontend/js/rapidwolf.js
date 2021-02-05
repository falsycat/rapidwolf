"use strict";

import MockProvider    from "./provider/mock.js";
import YouTubeProvider from "./provider/youtube.js";
import GoogleProvider  from "./provider/google.js";

export default class RapidWolf {
  constructor(param) {
    this.providers = [
      //new MockProvider(),
      new YouTubeProvider(),
      new GoogleProvider(),
    ];
    this.onFetch = param.onFetch;
  }
  fetch(keyword) {
    for (const p of this.providers) {
      p.fetch(keyword, this.onFetch);
    }
  }
};