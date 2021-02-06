"use strict";

import MockProvider    from "./provider/mock.js";
import YouTubeProvider from "./provider/youtube.js";
import WrappedProvider from "./provider/wrapped.js";

export default class RapidWolf {
  constructor(param) {
    this.providers = [
      //new MockProvider(),
      new YouTubeProvider(),
      new WrappedProvider({
        name: "Google",
        endpoint: "google",
        default_thumb: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      }),
      new WrappedProvider({
        name: "Connpass",
        endpoint: "connpass",
        default_thumb: "https://connpass.com/static/img/api/connpass_logo_1.png",
      }),
      new WrappedProvider({
        name: "Japan National Library",
        endpoint: "jplibrary",
        default_thumb: null,
      }),
    ];
    this.onFetch = param.onFetch;
  }
  fetch(keyword) {
    for (const p of this.providers) {
      p.fetch(keyword, this.onFetch);
    }
  }
};