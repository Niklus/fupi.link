import nav from "../../components/nav.js";
import footer from "../../components/footer.js";

export const about = ({ title, nonce, route }) => {
  return /*html*/ `<title>${title}</title>
    <style nonce="${nonce}">
      ${style}
    </style>
    </head>
    <body>
      <div class="wrapper">
        ${nav({ title, route })}
        <main>
          <h1>${title}</h1>
          <p>
            FupiLink is a free and open source URL shortener. It is written in
            JavaScript and uses Deno, koa, and Chart.js. Features include user
            authentication, link creation, and link analytics.
          </p>
        </main>
      </div>
      ${footer}
    </body>
    </html>
  `;
};

const style = /* css */ `
  h1, p {
    text-align: center;
  }
  main {
    max-width: 600px;
  }
`;
