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

  // Delete link with confirmation
  const deleteButton = document.querySelector(".delete");

  deleteButton.addEventListener("click", (e) => {
    const confirmDelete = confirm("Are you sure you want to delete this link?");
    if (confirmDelete) {
      // Delete link
      // use fetch to make a DELETE request to /api/links/:id
      // if successful, reload the page, otherwise show an error message
    }
  });
});
