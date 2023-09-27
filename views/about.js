import nav from "./components/nav.js";

const about = ({ title, nonce }) => {
  return /*html*/ `<title>${title}</title>
    <style nonce="${nonce}">
      ${style}
    </style>
    </head>
    <body>
      ${nav({ title })}
      <main>
        <h1>${title}</h1>
      </main>
    </body>
    </html>
  `;
};

const style = /* css */ `
  h1 {
    text-align: center;
  }
`;

export default about;
