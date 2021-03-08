var Pulsar = require('pulsar-client');

async function producerExample() {

    const client = new Pulsar.Client({
        serviceUrl: 'pulsar://localhost:6650',
    });

    const producer = await client.createProducer({
        topic: 'persistent://public/default/topic-test-2'
    });

    for(let i = 0; i < 10; i++) {
        const key = 'test-message';
        const value = Buffer.from(`producer message no. ${i}`);
        console.log(`Producing message ${key}:${value}`);
        producer.send({
            key: key,
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
