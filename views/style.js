import { trim } from "./utils/index.js";

const css = /* css */ `
  body {
    margin: 0 auto;
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

  /*footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;*/
  }
`;

export const style = trim(css);
