# Pulsar Testing
This repo contains some testing I've done with running pulsar locally.  All work is based on the [Pulsar docs](https://pulsar.apache.org/docs/en/standalone/).

## Structure
The example-1-express is a basic node API test I was working on.  This is incomplete.

Example-2-node is complete with tests of all subscription types in Pulsar.

## Gettings Started

1. **Create Containers** - Ensuring you have Docker installed and running, run the docker-compose file.

2. **Configure Pulsar Manager credentials**
```javascript
CSRF_TOKEN=$(curl http://localhost:7750/pulsar-manager/csrf-token)
curl \
   -H 'X-XSRF-TOKEN: $CSRF_TOKEN' \
   -H 'Cookie: XSRF-TOKEN=$CSRF_TOKEN;' \
   -H "Content-Type: application/json" \
   -X PUT http://localhost:7750/pulsar-manager/users/superuser \
   -d '{"name": "admin", "password": "apachepulsar", "description": "test", "email": "username@test.org"}'
```

3. **Create Environment** - In Pulsar Manager add ‘PulsarLocal' for the name and use http://pulsar:8080 for the service URL.  If this doesn’t work (and you’ve not used the docker-compose file then check the host name of the pulsar container in docker).

4. **Testing** - Go to the example-2-node folder, install all dependencies (via `npm install`) and run the npm scripted tests as follows (e.g. `npm run test-exclusive`)

