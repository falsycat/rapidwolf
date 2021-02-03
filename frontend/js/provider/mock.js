import BaseProvider from './base.js';

export default class MockProvider extends BaseProvider {
  constructor() {
    super("MOCK", "");
  }
  fetch(keyword, callback) {
    this.abortFetching();
    this.timer = setInterval(() => {
      callback(
        this.createItem(
          "test", "//google.com", "//thiscatdoesnotexist.com?"+Date.now(), Date.now()));
    }, 1000);
  }
  abortFetching() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};