import { style } from "./style.js";
import * as pages from "./pages/index.js";

export default (ctx) => {
  return (page, data) => /*html*/ `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Fupilink Url Shortener">
        <link 
          rel="icon" 
          type="image/x-icon" 
          href="https://cdn.jsdelivr.net/gh/Niklus/assets@main/favicon.ico"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/niklus/chota/@0.9.2/chota.min.css">
        <style nonce="${ctx.state.nonce}">
          ${style}
        </style>
        ${pages[page]({ ...data, nonce: ctx.state.nonce })}
  `;
};
