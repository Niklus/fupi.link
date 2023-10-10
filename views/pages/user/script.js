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
  const deleteButtons = document.querySelectorAll(".delete");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const confirmDelete = confirm(
        "Are you sure you want to delete this link?"
      );
      if (confirmDelete) {
        fetch("/api/links/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            link: e.target.dataset.link,
            linkId: e.target.dataset.id,
          }),
        })
          .then((res) => {
            if (res.ok) {
              window.location.reload();
            } else {
              throw new Error("Something went wrong");
            }
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    });
  });
});
