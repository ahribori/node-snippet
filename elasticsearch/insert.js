const Chance = require('chance');
const moment = require('moment');
const chance = new Chance();

const { Client } = require('@elastic/elasticsearch');

const es = new Client({
  node: 'http://192.168.0.220:9200'
});

const index = 'user';

async function run() {
  const { body: isExist } = await es.indices.exists({
    index
  });
  if (!isExist) {
    await es.indices.create({
      index,
      body: {
        mappings: {
          properties: {
            socialId: { type: 'text' },
            nickname: { type: 'text' },
            gender: { type: 'keyword' },
            birth: { type: 'text' },
            cash: { type: 'integer' },
            activity: { type: 'integer' },
            rating: { type: 'integer' },
            active: { type: 'boolean' }
          }
        }
      }
    });
  } else {
    const commands = [];
    for (let i = 100000; i > 0; i--) {
      const item = createData();
      commands.push({
        index: {
          _index: index
        }
      });
      commands.push(item);
    }

    try {
      const bulkResponse = await es.bulk({
        body: commands,
        refresh: true
      });

      console.log(bulkResponse.body.items[0]);

      const { body: count } = await es.count({ index });
      console.log(count);
    } catch (e) {
      console.log(e);
    }
  }
}

function createData() {
  return {
    socialId: chance.hash(),
    male: chance.pickone([true, false]),
    birth: moment(
      chance.date({
        year: chance.integer({ min: 1988, max: 2000 })
      })
    ).format('YYYY-MM-DD'),
    activity: chance.integer({ min: 0, max: 1000 }),
    cash: chance.integer({ min: 0, max: 300 }),
    rating: chance.integer({ min: 800, max: 2500 }),
    active: true
  };
}

run();
