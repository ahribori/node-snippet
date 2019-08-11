const { Client } = require('@elastic/elasticsearch');

const es = new Client({
  node: 'http://192.168.0.220:9200'
});

const index = 'user';

async function search() {
  try {
    console.time('search');
    const searchResult = await es.search({
      index,
      body: {
        query: {
          function_score: {
            query: {
              match: {
                gender: 'FEMALE'
              }
            },
            script_score: {
              script: {
                params: {
                  myRating: 1591
                },
                source:
                  "10000 - Math.abs(doc['rating'].value - params.myRating) + doc['activity'].value"
              }
            }
          }
        }
      }
    });
    const { hits } = searchResult.body;
    hits.hits.map(hit => {
      console.log(hit._source);
    });
    // console.log(hits);
    console.timeEnd('search');
  } catch (e) {
    console.log(e);
  }
}

search();
