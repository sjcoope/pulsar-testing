var Pulsar = require('pulsar-client');

async function consumerExample() {
    const client = new Pulsar.Client({
        serviceUrl: 'pulsar://localhost:6650',
    });

    const consumer = await client.subscribe({
        topic: 'persistent://public/default/topic-test-2',
        subscription: 'test-subscription-4',
        subscriptionType: 'Shared',
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