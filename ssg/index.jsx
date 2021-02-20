const path = require("path");
const fs = require("fs");
import fetch from "node-fetch";
import { renderToStringAsync } from "solid-js/web";
import App from "../src/App";

const lang = "en";
globalThis.fetch = fetch;

const jsFiles = [];

fs.readdirSync(path.join(__dirname, "../../build/js")).forEach((file) => {
  const regex = /^.+-chunkFile-.+$/;
  if (regex.test(file)) return;
  jsFiles.push(`<script type="module" src="/js/${file}"></script>`);
});

export default async (req) => {
  const { html, script } = await renderToStringAsync(() => (
    <App url={req.url} />
  ));
  return `<html lang="${lang}">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Solid SSG Test</title>
          
      <!-- Favicon -->
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      ${script}
    </head>
    <body><div id="app">${html}</div></body>
    ${jsFiles.join("")}
  </html>`;
};
