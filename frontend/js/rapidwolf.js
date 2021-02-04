"use strict";

import MockProvider    from "./provider/mock.js";
import YouTubeProvider from "./provider/youtube.js";

export default class RapidWolf {
  constructor(param) {
    this.providers = [
      //new MockProvider(),
      new YouTubeProvider(),
    ];
    this.onFetch = param.onFetch;
  }
  fetch(keyword) {
    for (const p of this.providers) {
      p.fetch(keyword, this.onFetch);
    }
  }
};