# my-msa

how to start

1. docker-compose builder --no-cache
2. docker-compose up -d

DB initialize
curl --location --request POST 'http://localhost:3000/init'

gateway_url = http://localhost:3000
auth_url = http://localhost:3001
event_url = http://localhost:3002
