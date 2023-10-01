import { trim } from "../../utils/index.js";

const css = /* css */ `
  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
      height: 100vh;
  }
  h1  {
    text-align: center;
  }
  a {
    color: #03cbaf;
    transition: transform 150ms ease-out;
  }
  a:active {
    color: #fbbb19;
  }
  
  .selection {
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    width: 200px;
  }

  main {
    height: 600px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const style = trim(css);
