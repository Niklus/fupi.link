import { jwt } from "../../deps.js";
import { isEmail } from "../../deps.js";
import { Router } from "../../deps.js";
import { bcrypt } from "../../deps.js";
import { nanoid } from "../../deps.js";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

export const userRouter = new Router({
  prefix: "/api/users",
});

userRouter.post("/signup", async (ctx) => {
  try {
    const { email, password } = ctx.request.body;

    if (!isEmail(email)) {
      return ctx.redirect("/page/signup?error=Invalid Email"); // Test this later
    }

    if (password.length < 8) {
      return ctx.redirect("/page/signup?error=Password too short");
    }

    /*const collection = await ctx.db.collection("users");

    const items = await collection.filter({
      email,
    });

    if (items.results.length) {
      return ctx.redirect("/page/signup?error=Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const _id = nanoid(10);

    const { props } = await ctx.db.collection("users").set(_id, {
      _id,
      email,
      password: hash,
    });

    const token = createToken(props._id);

    ctx.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });*/

    // TODO : Continue here: Create user page and redirect to it

    ctx.redirect("/?message=Account created");
  } catch (err) {
    ctx.throw(500, err);
  }
});

userRouter.get("/logout", async (ctx) => {
  ctx.cookies.set("token", null);
  ctx.redirect("/?message=Logged out");
});

// TODO: Create login route
userRouter.post("/login", async (ctx) => {});

// Use auth middleware to protect this route
userRouter.del("/delete", async (ctx) => {
  const { email } = ctx.request.body;

  if (!isEmail(email)) {
    return; // return error
  }

  try {
    /* const collection = await ctx.db.collection("users");
    const item = await collection.delete(email);
    console.log(JSON.stringify(item, null, 3));*/
    ctx.redirect("/page/signup?success=true");
  } catch (err) {
    ctx.throw(500, err);
  }
});
