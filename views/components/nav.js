const nav = ({ title }) => {
  return /*html*/ `<header>
    <nav class="nav">
      <div class="nav-left">
        <a class="brand" href="/">FupiLink</a>
          <a class='${title === "Home" ? "active" : ""}' href="/">Home</a>
          <a class='${
            title === "About" ? "active" : ""
          }' href="/page/about">About</a>
      </div>
      <div class="nav-right">
        <a href="/page/login" class="button outline primary">Login</a>
        <a href="/page/signup" class="button outline primary">Sign up</a>
      </div>
    </nav>
  </header>`;
};

export default nav;
