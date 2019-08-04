const Chance = require('chance');

const { Client } = require('@elastic/elasticsearch');

const es = new Client({
  node: 'http://192.168.0.240:9200',
});

const index = 'user';

async function run() {
  try {
    console.time('search');
    const searchResult = await es.search({
      index,
      body: {
        query: {
          function_score: {
            query: {
              range: {
                rating: {
                  gte: 1500,
                  lte: 1700
                }
              }
            },
            script_score: {
              script: {
                "params": {
                  "myRating": 1625,
                },
                source: "(1000 - Math.abs(doc['rating'].value - params.myRating)) + doc['cash'].value"
              }
            }
          },
        }
      }
    });
    const { hits } = searchResult.body;
    hits.hits.map(hit => {
      console.log(hit._source);
    });
    console.log(hits)
    console.timeEnd('search');
  } catch (e) {
    console.log(e);
  }
}

run();
