var express = require('express');
var router = express.Router();
var Pulsar = require('pulsar-client');

/* GET home page. */
router.get('/', function(req, res, next) {
    (async () => {
        // Create a client
        const client = new Pulsar.Client({
            serviceUrl: 'pulsar://localhost:6650',
        });

        // Create a producer
        const producer = await client.createProducer({
            topic: 'Topic-Test-1',
            subscription: 'Topic-Test-1-Sub-1'
        });

        // Send a message
        const message = 'producer 1 message';
        producer.send({
            data: Buffer.from(message)
        })

        await producer.flush();
        await producer.close();
        await client.close();
    })();

    return res.send('Producer - Message sent.')
});

module.exports = router;
