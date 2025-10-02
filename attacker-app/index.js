import fs from "fs";
import http from "http";
import https from "https";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const IP = "127.0.0.2";

var privateKey = fs.readFileSync("../certificates/localhost.key", "utf8");
var certificate = fs.readFileSync("../certificates/localhost.crt", "utf8");

var credentials = { key: privateKey, cert: certificate };

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: "./" });
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80, IP);
httpsServer.listen(443, IP);
