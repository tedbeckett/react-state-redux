const port = 3001;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
let clients = [];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/events', sseHandler);
app.get('/api/hello', helloHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));


// Middleware for GET /events endpoint
function sseHandler(req, res) {
  console.log('sseHandler: req=' + req.url);
  // Mandatory headers and http status to keep connection open
  const headers = {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  };
  res.writeHead(200, headers);

  // After client opens connection send all nests as string
  // const data = `data: ${JSON.stringify(nests)}\n\n`;
  // res.write(data);

  // Save client response object so we can send to it later.
  const clientId = Date.now();
  const messageId = 1;
  let client = { clientId, messageId, res };
  clients.push(client);

  // When client closes connection we update the clients list
  // avoiding the disconnected one
  req.on('close', () => {
    console.log(`Client ${clientId} connection closed`);
    clients = clients.filter(c => c.clientId !== clientId);
    client = null;
  });

  setInterval(() => {
    if (client) {
      console.log('sending event');
      const { res } = client;
      res.write(`id: ${client.messageId++}\n`);
      res.write("event: myevent\n");
      const myData = {hey: 'now'};
      res.write(`data: ${JSON.stringify(myData)}\n\n`);
    }
  }, 5000);
}

function helloHandler(res) {
  res.send('Hello');
}
