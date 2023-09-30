import { trim } from "../../utils/index.js";

const css = /* css */ `
  h1 {
    text-align: center;
  }
  form {
    max-width: 500px;
    margin: 0 auto;
    background-color: #eee;
    padding: 20px;
    border-radius: 10px;
  }
  .tip {
    padding-top: 10px;
    display: block;
  }
  .error-message {
    color: crimson;
  }
`;

export const style = trim(css);
