"use strict";

import MockProvider from "./provider/mock.js";

export default class RapidWolf {
  constructor(param) {
    this.providers = [
      new MockProvider(),
    ];
    this.onFetch = param.onFetch;
  }
  fetch(keyword) {
    for (const p of this.providers) {
      p.fetch(keyword, this.onFetch);
    }
  }
};