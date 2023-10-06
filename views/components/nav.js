import { isActiveRoute } from "../utils/index.js";

const nav = ({ title, user = null, route }) => {
  return /*html*/ `<header>
    <nav class="nav">
      <div class="nav-left">
        <a class="brand" href="/">FupiLink</a>
        ${
          user
            ? ""
            : `<a class='${isActiveRoute("/", route)}' href="/">Home</a>`
        }
        <a class='${isActiveRoute("/user", route)}' href="/user">My Links</a>
        ${
          user
            ? ""
            : `<a class='${isActiveRoute(
                "/about",
                route
              )}' href="/about">About</a>`
        }
        ${
          user
            ? `<a class='${isActiveRoute(
                "/analytics",
                route
              )}' href="/analytics">Analytics</a>`
            : ""
        }
      </div>
      <div class="nav-right">
        ${
          user
            ? /*html*/ `<a href="/logout" class="button outline primary">Logout</a>`
            : /*html*/ `<a href="/login" class="button outline primary">Login</a> 
            <a href="/signup" class="button outline primary">Sign up</a>`
        }
      </div>
    </nav>
  </header>`;
};

export default nav;
