import fs from "fs";
import http from "http";
import https from "https";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { decodeBase64, encodeBase64 } from "./utils/base64.js";

const app = express();

const IP = "127.0.0.1";

var privateKey = fs.readFileSync("../certificates/localhost.key", "utf8");
var certificate = fs.readFileSync("../certificates/localhost.crt", "utf8");

var credentials = { key: privateKey, cert: certificate };

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  const { message } = req.query;

  fs.readFile("./index.html", "utf8", (err, data) => {
    // Insert message as JSON string into the HTML (e.g., replace a placeholder)
    const html = data
      .replace("{{message}}", message || "No message")
      .replace("{{cookie}}", req.cookies.auth || "No cookie");

    res.send(html);
  });
});

app.get("/image.jpg", (req, res) => {
  if (req.cookies.auth) {
    res.sendFile("assets/image.jpg", { root: "./" });
  } else {
    res.sendFile("assets/placeholder.png", { root: "./" });
  }
});

app.get("/api/get", (req, res) => {
  if (req.cookies.auth) {
    res.send({
      message: `Hello world ${decodeBase64(req.cookies.auth)}!`,
    });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
});

app.get("/auth/login", (req, res) => {
  const username = req.query.username;

  // encode username in base64
  const authValue = encodeBase64("username=" + username);

  // sent cookie
  res.cookie("auth", authValue, {});

  res.send("Logged In!");
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80, IP);
httpsServer.listen(443, IP);
