import { trim } from "./utils/index.js";

const css = /* css */ `
  body {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  header {
    background: #eee;
  }

  nav {
    background: #eee;
    max-width: 970px;
    margin: 0 auto;
    padding: 1rem;
  }

  .wrapper {
    flex: 1;
  }

  main {
    max-width: 970px;
    margin: 0 auto;
    padding: 50px;
  }

  .links { 
    max-width: 970px;
    margin: 0 auto;
    padding-right: 20px;
    padding-left: 20px;
  }

  footer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const style = trim(css);
