import { makeScript } from "../../utils/index.js";

export const script = await makeScript(() => {
  const chartType = document.querySelector("#chart-type");
  const context = document.querySelector("#app-chart").getContext("2d");
  let chart = null;

  (async () => {
    const res = await fetch("/api/links/user");
    const data = await res.json();

    const colors = data.map(() => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgba(${r}, ${g}, ${b})`;
    });

    const render = (type) => {
      if (chart) {
        chart.destroy();
      }
      chart = new Chart(context, {
        type: type,
        data: {
          // TODO: make reader friendly (e.g. remove protocol and include domain of long link)
          labels: [...data.map((link) => link.shortLink)],
          datasets: [
            {
              label: "Clicks",
              data: [...data.map((link) => link.clicks)],
              backgroundColor: colors,
              borderWidth: 2,
            },
          ],
        },
      });
    };

    chartType.addEventListener("change", (event) => {
      render(event.currentTarget.value);
    });

    render(chartType.value);
  })();
});
