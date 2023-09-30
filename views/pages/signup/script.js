import { makeScript } from "../../utils/index.js";

export const script = await makeScript(() => {
  const search = new URLSearchParams(window.location.search);
  const error = search.get("error");
  if (error) {
    const msg = search.get("msg");
    const p = document.querySelector(`.${error}`);
    p.textContent = msg;
  }
});
