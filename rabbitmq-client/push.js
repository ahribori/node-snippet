const amqp = require('amqplib');

const connect = amqp.connect('amqp://192.168.0.240:5672');
const q = 'my-queue';

const message = process.argv[2] || 'hello';

connect.then(async conn => {
  const channel = await conn.createChannel();
  await channel.assertQueue(q);
  await channel.sendToQueue(q, Buffer.from(JSON.stringify({ message })));
  await channel.close();
  await conn.close();
});
