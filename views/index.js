import { style } from "./style.js";
import * as pages from "./pages/index.js";

export default (ctx, next) => {
  ctx.render = (page, data) => {
    return /*html*/ `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="description" content="A description of the website">
          <link rel="stylesheet" href="/chota.min.css">
          <style nonce="${ctx.state.nonce}">
            ${style}
          </style>
          ${pages[page]({ ...data, nonce: ctx.state.nonce })}
    `;
  };
  return next();
};
