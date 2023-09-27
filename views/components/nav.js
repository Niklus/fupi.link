const nav = ({ title }) => {
  return /*html*/ `<header>
    <nav class="nav">
      <div class="nav-left">
        <a class="brand" class='${
          title === "Home" ? "active" : ""
        }' href="/">FupiLink</a>
        <div class="tabs">
          <a class='${title === "Home" ? "active" : ""}' href="/">Home</a>
          &nbsp;
          <a class='${
            title === "About" ? "active" : ""
          }' href="/info/about">About</a>
        </div>
      </div>
      <div class="nav-right">
        <a class="button outline primary">Login</a>
        <a class="button outline primary">Sign up</a>
      </div>
    </nav>
  </header>`;
};

export default nav;
