import nav from "../../components/nav.js";
import footer from "../../components/footer.js";
import { script } from "./script.js";
import { style } from "./style.js";

export const user = ({ title, user, nonce, links, route }) => {
  return /*html*/ `<title>${title}</title>
    <style nonce="${nonce}">
      ${style}
    </style>
    </head>
    <body>
      <div class="wrapper">
        ${nav({ title, user, route })}
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
        ${links /**TODO: Sort by createdAt */
          .map(
            (link) => /*html*/ `
              <div class="card">
                <button class="delete" data-id="${link.linkId}" data-link="${link.link}">Delete</button> 
                <span>Short: </span><a href="${link.shortLink}" target="_blank">${link.shortLink}</a><br/>
                <span>Long: </span><span>${link.link}</span><br/>
                <span>Clicks: ${link.clicks}</span><br/>
              </div><br/>
            `
          )
          .join("")}
        </div>
      </div>
      ${footer}
      <script nonce="${nonce}">
        ${script}
      </script>
    </body>
    </html>
  `;
};
