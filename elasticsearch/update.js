const { Client } = require('@elastic/elasticsearch');

const es = new Client({
  node: 'http://192.168.0.220:9200'
});

console.time('update');
es.update({
  index: 'user',
  id: 'DHNiWmwByogG2yiqJIPk',
  body: {
    doc: {
      cash: 334
    }
  }
})
  .then(response => {
    console.log(response);
    console.timeEnd('update');

    es.get({
      index: 'user',
      id: 'DHNiWmwByogG2yiqJIPk',
    }).then(response => {
      console.log(response.body)
    })
  })
  .catch(error => {
    console.log(error.body.error);
    console.timeEnd('update');
  });
