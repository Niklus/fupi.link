import home from "./home.js";
import about from "./about.js";
import notFound from "./notFound.js";
import { trim } from "./utils/index.js";

const pages = {
  home,
  about,
  notFound,
};

const render = (ctx, next) => {
  ctx.render = (page, data) =>
    /*html*/ `<!DOCTYPE html>
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
  ` // Is this bad for performance?
      .replaceAll("\n", "")
      .replaceAll("  ", "")
      .trim();
  return next();
};

const style = trim(/* css */ `
  body {
    margin: 0 auto;
  }
  
  header {
    background: #eee;
  }

  nav {
    background: #eee;
    max-width: 970px;
    margin: 0 auto;
    padding: 1rem;
  }

  main {
    max-width: 970px;
    margin: 0 auto;
  }`);

export default render;
