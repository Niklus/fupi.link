import nav from "../../components/nav.js";
import footer from "../../components/footer.js";

export const notFound = ({ title, nonce }) => {
  return /*html*/ `<title>${title}</title>
    <style nonce="${nonce}">
      ${style}
    </style>
    </head>
    <body>
      ${nav({ title })}
      <main>
        <h1>${title}: 404</h1>
      </main>
      ${footer}
    </body>
    </html>
  `;
};

const style = /* css */ `
  body {
    text-align: center;
    color: crimson;
  }`;
