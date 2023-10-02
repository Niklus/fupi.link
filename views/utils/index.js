import { minify } from "../../deps.js";
import { CleanCSS } from "../../deps.js";

export const makeScript = async (func) => {
  const iife = `(${func.toString()})()`;
  const result = await minify(iife);
  return result.code;
};

export const trim = (style) => {
  return new CleanCSS({}).minify(style).styles;
};

// Used to check if the current route is active
// Use in nav component later
// Pass in the route and the currentRoute.
// The currentRoute is passed in from the router.
// The route is passed in the nav component.
export const isActiveRoute = (route, currentRoute) => {
  return route === currentRoute ? "active" : "";
};
