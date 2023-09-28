import { trim } from "../../utils/index.js";

const css = /* css */ `
  h1  {
    text-align: center;
  }

  button {
    display: inline-block;
  }

  .row {
    max-width: 60%;
    margin: 0 auto;
  }

  input {
    max-width: 80%;
  }

  form button {
    max-width: 20%;
  }

  .shortLink, .message {
    color: teal;
    font-style: italic;
    margin-top: 20px;
    font-size: 22px;
    text-align: center;
    display: block;
  }
`;

export const style = trim(css);
