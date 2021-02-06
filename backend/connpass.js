/*
 * API details: "https://connpass.com/about/api/"
 */

import fetch from "node-fetch";

exports.handler = (ev, ctx, cb) => {
  const keyword = ev.queryStringParameters.q || "";
  fetch(`https://connpass.com/api/v1/event/?keyword=${encodeURI(keyword)}&count=50`, {
        "method": "GET",
      }).
      then((res) => res.json()).
      then((res) => {
        let results = [];
        for (const i of res.events) {
          results.push({
            title: i.title,
            url: i.event_url,
            date: i.started_at,
          });
        }
        cb(null, {
          statusCode: 200,
          body: JSON.stringify(results),
        });
      }).
      catch((err) => {
        console.error(err);
        cb(null, {
          statusCode: 418,
          body: JSON.stringify({
            error: err.message,
          }),
        });
      });
};