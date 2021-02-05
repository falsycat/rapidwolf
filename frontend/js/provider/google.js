/*
 * Google Data Provider
 */

import BaseProvider from "./base.js";

export default class GoogleProvider extends BaseProvider {
  constructor() {
    super("Google", "");
    this.count = 0;
  }
  fetch(keyword, callback) {
    this.abortFetching();
    fetch("/.netlify/functions/google?q="+keyword).
      then((res) => res.json()).
      then((res) => {
        if (res.error) {
          return;
        }
        for (const i of res) {
          callback(this.createItem({
            title: i.title,
            url: i.url,
            thumb: "",
            date: null,
          }));
        }
      }).
      catch((err) => {
        console.error(err);
      });
  }
  abortFetching() {
    ++this.count;
  }
};