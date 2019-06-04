const amqp = require('amqplib');

const connect = amqp.connect('amqp://192.168.0.240:5672');
const q = 'my-queue';

connect.then(async conn => {
  const channel = await conn.createChannel();
  await channel.assertQueue(q);
  channel.prefetch(2);
  channel.consume(q, message => {
    if (message) {
      console.log('Message received: ', JSON.parse(message.content.toString()));
      console.log('Processing...');
      setTimeout(() => {
        console.log('Done.');
        channel.ack(message);
      }, 3000);
    }
  });
});
