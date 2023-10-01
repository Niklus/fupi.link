import nav from "../../components/nav.js";
import footer from "../../components/footer.js";
import { script } from "./script.js";
import { style } from "./style.js";

export const login = ({ title, nonce }) => {
  return /*html*/ `<title>${title}</title>
    <style nonce="${nonce}">
      ${style}
    </style>
    </head>
    <body>
      <div class="wrapper">
        ${nav({ title })}
        <main>
          <form action="/api/users/login" method="post">
            <h1>Login</h1>
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
              placeholder="Enter your password" 
              required
            />
            <p class="password error-message"></p>
            <br/>
            <div class="actions">
              <button type="submit">Login</button>
              <span class="tip">Don't have an account? <a href="/signup">Sign up</a> </span>
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
