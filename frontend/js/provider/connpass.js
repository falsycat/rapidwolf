/*
 * Connpass Data Provider
 */

import BaseProvider from './base.js';

export default class ConnpassProvider extends BaseProvider {
  constructor() {
    super("Connpass", "");
    this.count = 0;
  }
  fetch(keyword, callback) {
    if (this.downed) return;
    this.abortFetching();

    const count = this.count;
    fetch("/.netlify/functions/connpass?q="+keyword).
      then((res) => res.json()).
      then((res) => {
        if (res.error) {
          console.error(res.error);
          return;
        }
        if (this.count !== count) {
          return;
        }
        for (const i of res) {
          callback(this.createItem({
            title: i.title,
            url: i.url,
            thumb: "",
            date: new Date(i.date),
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