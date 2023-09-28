import { makeScript } from "../../utils/index.js";

export const script = await makeScript(() => {
  const search = new URLSearchParams(window.location.search);
  const shortLink = search.get("shortLink");
  const message = search.get("message");

  if (shortLink) {
    let linkEl = /* html */ `<a href="${shortLink}" class="shortLink" target="_blank">${removeProtocol(
      shortLink
    )}</a>`;
    rennderEl(linkEl);
  }

  if (message) {
    let messageEl = /* html */ `<p class="message">${message}</p>`;
    rennderEl(messageEl);
  }

  function rennderEl(el) {
    document.querySelector("main").insertAdjacentHTML("beforeend", el);
  }

  function removeProtocol(url) {
    return url.replace(/^https?:\/\//i, "");
  }
});
