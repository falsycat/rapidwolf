/*
 * Wrapped Data Provider
 * 
 *  Retrieves data from rapidwolf wrapper API running on netlify-lambda.
 */

import BaseProvider from './base.js';

export default class WrappedProvider extends BaseProvider {
  constructor({name, icon, endpoint, default_thumb}) {
    super(name, icon);
    this.endpoint = endpoint;
    this.default_thumb = default_thumb;
    this.count = 0;
  }
  fetch(keyword, callback) {
    if (this.downed) return;
    this.abortFetching();

    const count = this.count;
    fetch(`/.netlify/functions/${this.endpoint}?q=${encodeURI(keyword)}`).
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
            thumb: i.thumb ||　this.default_thumb || null,
            date: i.date? new Date(i.date): null,
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