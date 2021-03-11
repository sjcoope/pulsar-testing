var Pulsar = require('pulsar-client');
var config = require('../config')

async function consumerExample() {
    const client = new Pulsar.Client({
      serviceUrl: config.pulsarServiceUrl,
    });

    const consumer = await client.subscribe({
        topic: 'persistent://public/default/topic-test-2',
        subscription: 'test-subscription-3',
        subscriptionType: 'KeyShared',
    })

    // Receive messages
    for (let i = 0; i < 10; i += 1) {
      const msg = await consumer.receive();
      console.log(msg.getData().toString());
      consumer.acknowledge(msg);
    }
  
    await consumer.close();
    await client.close();
}

consumerExample()
  .catch((err) => {
    console.error(`Something went wrong:\n${err}`);
    process.exit(1);
  });