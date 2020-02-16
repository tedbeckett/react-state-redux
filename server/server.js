import { eventGenerator } from './eventGenerator.mjs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const port = 3001;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/hello', res => res.send('Hello World'));
app.get('/events', sseHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));

function sseHandler(req, res) {
    console.log('Received request for server-sent events');
    // Mandatory headers and http status to keep SSE connection open
    const headers = {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);
    let stop = false;
    req.on('close', () => stop = true);
    for (const event of eventGenerator()) {
        console.log('SseSender.send: ' + JSON.stringify(event, null, 2));
        if (stop) {
            break;
        }
        // const id = this.nextMessageId++;
        // this.response.write(`id: ${id}\n`);
        res.write(`event: ${event.type}\n`);
        res.write(`data: ${JSON.stringify(event.data)}\n\n`);
    }
}
