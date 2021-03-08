var express = require('express');
var router = express.Router();
const Pulsar = require('pulsar-client');

/* GET home page. */
router.get('/', function(req, res, next) {

  (async () => {
    // Create a client
    const client = new Pulsar.Client({
      serviceUrl: 'pulsar://localhost:6650',
    });

    // Create a consumer
    const consumer = await client.subscribe({
      topic: 'Topic-Test-1',
      subscription: 'Topic-Test-1-Sub-1',
      subscriptionType: 'Exclusive',
    });

    // Receive messages
    for (let i = 0; i < 10; i += 1) {
      const msg = await consumer.receive();
      console.log(msg.getData().toString());
      consumer.acknowledge(msg);
    }

    await consumer.close();
    await client.close();
  })();
});

module.exports = router;
