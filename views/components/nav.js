const nav = ({ title, user = null }) => {
  return /*html*/ `<header>
    <nav class="nav">
      <div class="nav-left">
        <a class="brand" href="/">FupiLink</a>
        ${
          user
            ? ""
            : /*html*/ `<a class='${
                title === "Home" ? "active" : ""
              }' href="/">Home</a>`
        }
          <a class='${
            title === "User" ? "active" : ""
          }' href="/user">My Links</a>
          ${
            user
              ? ""
              : /*html*/ `<a class='${
                  title === "About" ? "active" : ""
                }' href="/about">About</a>`
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
