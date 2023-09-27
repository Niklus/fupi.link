import { makeScript } from "./utils/index.js";
import nav from "./components/nav.js";
import { trim } from "./utils/index.js";

const home = ({ title, nonce }) => {
  return /*html*/ `<title>${title}</title>
    <style nonce="${nonce}">
      ${style}
    </style>
    </head>
    <body>
      ${nav({ title })}
      <main>
        <h1>FupiLink</h1>
        <form class="row" action="/api/links" method="post">
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
      <script nonce="${nonce}">
        ${script}
      </script>
    </body>
    </html>
  `;
};

// Client Scripts
const script = await makeScript(() => {
  const search = new URLSearchParams(window.location.search);
  const shortLink = search.get("shortLink");
  const message = search.get("message");

  if (shortLink) {
    let linkEl = /* html */ `<a href="${shortLink}" class="shortLink" target="_blank">${shortLink}</a>`;
    rennderEl(linkEl);
  }

  if (message) {
    let messageEl = /* html */ `<p class="message">${message}</p>`;
    rennderEl(messageEl);
  }

  function rennderEl(el) {
    document.querySelector("main").insertAdjacentHTML("beforeend", el);
  }
});

const style = trim(/* css */ `
  h1  {
    text-align: center;
  }

  button {
    display: inline-block;
  }

  .row {
    max-width: 60%;
    margin: 0 auto;
  }

  input {
    max-width: 80%;
  }

  form button {
    max-width: 20%;
  }

  .shortLink, .message {
    color: teal;
    font-style: italic;
    margin-top: 20px;
    font-size: 22px;
    text-align: center;
    display: block;
  }`);

export default home;
