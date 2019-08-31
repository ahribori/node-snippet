const { Client } = require('@elastic/elasticsearch');

const es = new Client({
  node: 'http://192.168.0.220:9200'
});

const index = 'user-test';

async function search() {
  try {
    console.time('search');
    const searchResult = await es.search({
      index,
      body: {
        query: {
          function_score: {
            query: {
              bool: {
                should: {
                  distance_feature: {
                    field: 'location',
                    pivot: '500km',
                    origin: [127.1218342, 37.3847652],
                  }
                }
              }
            },
            script_score: {
              script: {
                params: {
                  myRating: 1591
                },
                source:
                  "2000 - Math.abs(doc['rating'].value - params.myRating) + doc['activity'].value"
              }
            }
          }
        }
      }
    });
    const { hits } = searchResult.body;
    let kql = null;
    hits.hits.map(hit => {
      const { _source } = hit;
      const { rating, activity } = _source;
      console.log([rating, activity]);
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
