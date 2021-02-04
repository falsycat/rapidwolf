import BaseProvider from './base.js';

export default class MockProvider extends BaseProvider {
  constructor() {
    super("MOCK", "");
  }
  fetch(keyword, callback) {
    this.abortFetching();
    this.timer = setInterval(() => {
      callback(
        this.createItem({
          title: "test",
          url: "//google.com",
          thumb: "//thiscatdoesnotexist.com?"+Date.now(),
          date: new Date,
        }));
    }, 1000);
  }
  abortFetching() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};