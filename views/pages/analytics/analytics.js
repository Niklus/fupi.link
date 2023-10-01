import nav from "../../components/nav.js";
import footer from "../../components/footer.js";
import { makeScript } from "../../utils/index.js";
import { style } from "./style.js";

export const analytics = ({ title, user, nonce }) => {
  return /*html*/ `<title>${title}</title>
    <script src="/chart.umd.min.js"></script>
    <style nonce="${nonce}">
      ${style}
    </style>
    </head>
    <body data-id="${user._id}">
      ${nav({ title, user })}
      <div class="selection">
        <h1>Analytics</h1>
        <select id="chart-type">
          <option value="bar">Bar</option>
          <option value="line">line</option>
        </select>
      </div>
      <main>
        <canvas id="app-chart"></canvas>
      </main>
      ${footer}
      <script nonce="${nonce}">
        ${script}
      </script>
    </body>
    </html>
  `;
};

const script = await makeScript(() => {
  const body = document.querySelector("body");

  console.log(body.dataset.id);

  // TODO: fetch data from server using body.dataset.id as user id
  // Render chart using data from server

  const chartType = document.querySelector("#chart-type");
  const context = document.querySelector("#app-chart").getContext("2d");

  let chart = null;

  /*const colors = {
    safari: "#25AEEE",
    chrome: "#FECD52",
    firefox: "#FD344B",
    edge: "#57D269",
  };*/

  const render = (type) => {
    if (chart) {
      chart.destroy();
    }
    chart = new Chart(context, {
      type: type,
      data: {
        labels: ["Safari", "Chrome", "Firefox", "Edge"],
        datasets: [
          {
            label: "Browser Stats 2019",
            data: [16.74, 64.26, 4.47, 2.11],
            /*backgroundColor: [
              colors.safari,
              colors.chrome,
              colors.firefox,
              colors.edge,
            ],*/
            borderWidth: 3,
          },
        ],
      },
    });
  };

  chartType.addEventListener("change", (event) => {
    render(event.currentTarget.value);
  });

  render(chartType.value);
});
