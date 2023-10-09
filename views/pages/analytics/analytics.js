import nav from "../../components/nav.js";
import footer from "../../components/footer.js";
import { style } from "./style.js";
import { script } from "./script.js";

export const analytics = ({ title, user, nonce, route }) => {
  return /*html*/ `<title>${title}</title>
    <script nonce="${nonce}" src="/chart.umd.min.js"></script>
    <style nonce="${nonce}">
      ${style}
    </style>
    </head>
    <body>
      <div class="wrapper">
        ${nav({ title, user, route })}
        <div class="selection">
          <select id="chart-type">
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
            <option value="doughnut">Doughnut</option>
            <option value="polarArea">Polar Area</option>
          </select>
        </div>
        <main>
          <canvas id="app-chart"></canvas>
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
