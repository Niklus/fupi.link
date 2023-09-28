import nav from "../../components/nav.js";
import footer from "../../components/footer.js";

export const login = ({ title, nonce }) => {
  return /*html*/ `<title>${title}</title>
    <style nonce="${nonce}">
      ${style}
    </style>
    </head>
    <body>
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
          /><br/>
          <label for="password">Password</label>
          <input 
            type="password"  
            name="password" 
            id="password"
            placeholder="Enter your password" 
            required
          /><br/>
          <div class="actions">
            <button type="submit">Login</button>
            <span class="tip">Don't have an account? <a href="/page/signup">Sign up!</a> </span>
          </div>
        </form>
      </main>
      ${footer}
    </body>
    </html>
  `;
};

const style = /* css */ `
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
`;
