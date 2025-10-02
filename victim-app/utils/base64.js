function encodeBase64(str) {
  return Buffer.from(str, "utf-8").toString("base64");
}

function decodeBase64(base64) {
  return Buffer.from(base64, "base64").toString("utf-8");
}

export { encodeBase64, decodeBase64 };
