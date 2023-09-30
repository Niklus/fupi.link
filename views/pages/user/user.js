import nav from "../../components/nav.js";
import footer from "../../components/footer.js";
import { makeScript } from "../../utils/index.js";
import { style } from "./style.js";

export const user = ({ title, user, nonce, links }) => {
  return /*html*/ `<title>${title}</title>
    <style nonce="${nonce}">
      ${style}
    </style>
    </head>
    <body>
      ${nav({ title, user })}
      <main>
        <h1>${user.email}</h1>
        <form class="row" action="/api/links/user" method="post">
          <input 
            class="col" 
            type="url"  
            name="link" 
            id="link"
            placeholder="Enter your long URL here" 
            required
          />
          <button class="col" type="submit">Shorten</button>
        </form>
      </main>
      <div class="links">
        ${links
          .map(
            (link) => /*html*/ `
              <div class="card">
                <span>Short: </span><a href="${link.shortLink}" target="_blank">${link.shortLink}</a><br/>
                <span>Long: </span><span>${link.link}</span><br/>
                <span>Clicks: ${link.clicks}</span><br/>
                <a href="/api/links/delete/${link._id}" class="delete">Delete</a>
              </div><br/>
            `
          )
          .join("")}
      </div>
      ${footer}
      <script nonce="${nonce}">
        ${script}
      </script>
    </body>
    </html>
  `;
};

const script = await makeScript(() => {
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
