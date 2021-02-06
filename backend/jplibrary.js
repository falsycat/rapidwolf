/*
 * API details: "https://iss.ndl.go.jp/information/api/riyou/"
 */

import fetch from "node-fetch";
import xml from "fast-xml-parser"

exports.handler = (ev, ctx, cb) => {
  const keyword = ev.queryStringParameters.q || "";
  fetch(`https://iss.ndl.go.jp/api/opensearch?cnt=10&title=${encodeURI(keyword)}&ndc=2&dpid=iss-ndl-opac`, {
      "method": "GET",
    }).
      then((res) => res.text()).
      then((res) => {
        res = xml.parse(res);

        const items =
          res.rss &&
          res.rss.channel &&
          res.rss.channel.item?
            res.rss.channel.item: [];

        const results = res.rss.channel.item.map((i) => {
          const isbn =
            (i["dc:identifier"] || []).
            find((s) => (s+"").length === 10);  /* ISBN consists of 10 digits */
          return {
            title: i.title,
            url: i.link,
            thumb: isbn? "https://iss.ndl.go.jp/thumbnail/"+isbn: null,
            date: i.pubDate,
          };
        });
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