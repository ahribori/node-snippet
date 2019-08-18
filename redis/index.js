const Redis = require('ioredis');
const redis = new Redis('192.168.0.240:6379');

redis.monitor().then(monitor => {
  monitor.on('monitor', (time, args, source, database) => {
    console.log(new Date(time * 1000).toLocaleString(), args, source, database);
  });
});

async function run() {
  const allKeys = await redis.keys('*');
  console.log(allKeys);
  await redis.flushall();

  await redis.lpush('room-1', 'daniel', 'hello');
  await redis.lpush('room-1', 'dave', 'hi');
  const result = await redis.lrange('room-1', 0, -1);
  console.log(result);
}

run();
