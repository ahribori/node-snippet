const mongoose = require('mongoose');
const Chance = require('chance');
const moment = require('moment');
const chance = new Chance();

mongoose.connect('mongodb://192.168.0.200:27018/test', { useNewUrlParser: true }).then(() => {
  console.log('connected');
});

const User = mongoose.model('User', { nick: String, rating: Number, age: Number, active: Boolean });

function createUser() {
  return {
    insertOne: {
      document: {
        socialId: chance.hash(),
        deviceId: chance.android_id(),
        nickname: chance.first(),
        gender: chance.pickone(['MALE', 'FEMALE']),
        birth: moment(
          chance.date({
            year: chance.integer({ min: 1988, max: 2000 })
          })
        ).format('YYYY-MM-DD'),
        cash: chance.integer({ min: 0, max: 300 }),
        rating: chance.integer({ min: 800, max: 2500 }),
        active: 1
      }
    }
  };
}

let bulk = [];
for (let i = 100000; i > 0; i--) {
  const user = createUser();
  bulk.push(user);
}

User.bulkWrite(bulk).then(() => {
  console.log('writed');
});
