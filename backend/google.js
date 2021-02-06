import google from "google-it"

exports.handler = (ev, ctx, cb) => {
  google({
    query: ev.queryStringParameters.q,
    limit: 50,
    disableConsole: true,
  }).
    then((res) => {
      let results = [];
      for (const i of res) {
        results.push({
          title: i.title,
          url: i.link,
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