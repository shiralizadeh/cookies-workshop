import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { encrypt } from "./utils/encryption.js";

const app = express();

const IP = "127.0.0.1";

import fs from "fs";
import http from "http";
import https from "https";
var privateKey = fs.readFileSync("./certificates/localhost.key", "utf8");
var certificate = fs.readFileSync("./certificates/localhost.crt", "utf8");

var credentials = { key: privateKey, cert: certificate };

// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/login", (req, res) => {
  const username = req.query.username;

  // sent cookie
  res.cookie("auth", "username=" + username, { httpOnly: true, secure: true });

  res.send("Logged In!");
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80, IP);
httpsServer.listen(443, IP);
