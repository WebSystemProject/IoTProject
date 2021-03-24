const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const http = require("http");
const path = require("path");
const WebSocket = require("ws");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { MAIN_PORT, NODE_ENV, GOOGLE_APPLICATION_CREDENTIALS } = process.env;
NODE_ENV !== "production"
  ? app.use(morgan("dev"))
  : app.use(morgan("combined"));
const { listenForPullMessages } = require("./subscription");
app.use(helmet());
app.use(cors());
app.use(['/static'],express.static(path.join(__dirname, 'static')));

app.get("/", (req, res) => {
  return res.render(path.join(__dirname,'/static/index.ejs'));
});

app.all("*", (req, res) => {
    res.status(404).send('Not found');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        console.log(`Broadcasting data ${data}`);
        client.send(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
};

server.listen(MAIN_PORT, () => {
  console.log(`Example app listening at http://localhost:${MAIN_PORT}`);
});

listenForPullMessages(wss); //Listening the incoming telemetry;
