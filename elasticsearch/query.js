const { Client } = require('@elastic/elasticsearch');

const es = new Client({
  node: 'http://192.168.0.180:9200'
});

const index = 'user-test';

async function search() {
  try {
    console.time('search');
    const searchResult = await es.search({
      index,
      body: {
        query: {
          bool: {
            must: [
              {
                wildcard: {
                  nickname: {
                    value: '*dani*',
                    boost: 1.0,
                    rewrite: 'constant_score'
                  }
                }
              }
            ]
          }
        }
      }
    });
    const { hits } = searchResult.body;
    let kql = null;
    hits.hits.map(hit => {
      const { _source } = hit;
      const { nickname, rating, activity } = _source;
      console.log([nickname, rating, activity]);
      if (!kql) {
        kql = `_id: "${hit._id}"`;
      } else {
        kql += ` or _id: "${hit._id}"`;
      }
    });
    console.log(JSON.stringify(hits.hits.map(h => h._score.toFixed(0))));
    console.timeEnd('search');
    console.log(kql);
  } catch (e) {
    console.log(e.meta.body.error.reason);
  }
}

search();
