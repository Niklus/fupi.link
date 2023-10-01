import nav from "../../components/nav.js";
import footer from "../../components/footer.js";
import { script } from "./script.js";
import { style } from "./style.js";

export const signup = ({ title, nonce }) => {
  return /*html*/ `<title>${title}</title>
    <style nonce="${nonce}">
      ${style}
    </style>
    </head>
    <body>
      <div class="wrapper">
        ${nav({ title })}
        <main>
          <form action="/api/users/signup" method="post">
            <h1>Sign up</h1>
            <label for="email">Email</label>
            <input 
              type="email"  
              name="email" 
              id="email"
              placeholder="Enter your email" 
              required
            />
            <p class="email error-message"></p>
            <br/>
            <label for="password">Password</label>
            <input 
              type="password"  
              name="password" 
              id="password"
              placeholder="Enter your password: at least 6 characters" 
              required
            />
            <p class="password error-message"></p>
            <br/>
            <div class="actions">
              <button type="submit">Sign up</button>
              <span class="tip">Already have an account? <a href="/login">Log in</a> </span>
            </div>
          </form>
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
