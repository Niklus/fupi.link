import nav from "../../components/nav.js";
import footer from "../../components/footer.js";

export const about = ({ title, nonce }) => {
  return /*html*/ `<title>${title}</title>
    <style nonce="${nonce}">
      ${style}
    </style>
    </head>
    <body>
      <div class="wrapper">
        ${nav({ title })}
        <main>
          <h1>${title}</h1>
        </main>
      </div>
      ${footer}
    </body>
    </html>
  `;
};

const style = /* css */ `
  h1 {
    text-align: center;
  }
`;
