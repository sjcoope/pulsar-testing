var Pulsar = require('pulsar-client');
var config = require('../config')

async function producerExample() {

    const client = new Pulsar.Client({
        serviceUrl: config.pulsarServiceUrl,
    });

    const producer = await client.createProducer({
        topic: 'persistent://public/default/topic-test-2'
    });

    for(let i = 0; i < 10; i++) {
        const key = `test-message-${i}`;
        const value = Buffer.from(`producer message no. ${i}`);
        console.log(`Producing message ${key}:${value}`);
        producer.send({
            partitionKey: key,
            data: value
        });
    }

    await producer.flush();
    await producer.close();
    await client.close();
}

producerExample()
  .catch((err) => {
    console.error(`Something went wrong:\n${err}`);
    process.exit(1);
  });
