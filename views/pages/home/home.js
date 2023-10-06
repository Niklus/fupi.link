import nav from "../../components/nav.js";
import footer from "../../components/footer.js";
import { style } from "./style.js";
import { script } from "./script.js";

export const home = ({ title, nonce, route }) => {
  return /*html*/ `<title>${title}</title>
    <style nonce="${nonce}">
      ${style}
    </style>
    </head>
    <body>
      <div class="wrapper">
        ${nav({ title, route })}
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
      </div>
      ${footer}
      <script nonce="${nonce}">
        ${script}
      </script>
    </body>
    </html>
  `;
};
