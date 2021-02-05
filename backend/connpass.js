/*
 * API details: "https://connpass.com/about/api/"
 */

import fetch from "node-fetch";

exports.handler = (ev, ctx, cb) => {
  fetch(`https://connpass.com/api/v1/event/?keyword=${ev.queryStringParameters.q}&count=50`, {
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
        cb(null, {
          statusCode: 418,
          body: JSON.stringify({
            error: err.message,
          }),
        });
      });
};