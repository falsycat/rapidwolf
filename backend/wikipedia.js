/*
 * API details: "https://iss.ndl.go.jp/information/api/riyou/"
 */

import wikijs from "wikijs"

exports.handler = (ev, ctx, cb) => {
  const keyword = ev.queryStringParameters.q;

  const thrower = (err) => {
    console.error(err);
    cb(null, {
      statusCode: 418,
      body: JSON.stringify({
        error: err.message,
      }),
    });
  };

  const wiki = wikijs({
    headers: {
      "User-Agent": "rapidwolf (https://falsy.cat; me@falsy.cat) wiki.js",
    },
  });
  (keyword ?
    wiki.search(keyword, 20).then(res => res.results):
    wiki.random(20)).
    then((res) => {
      let results = [];
      let promises = [];
      for (const title of res) {
        promises.push(
          wiki.page(title).
            then(async (p) => {
              const img = await (async () => p.mainImage())();
              results.push({
                title: title,
                url: p.url(),
                thumb: img? img: null,
              });
            }));
      }
      Promise.all(promises).
        then(() => {
          cb(null, {
            statusCode: 200,
            body: JSON.stringify(results),
          });
        }).
        catch(thrower);
    }).
    catch(thrower);
};