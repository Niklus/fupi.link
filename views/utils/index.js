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

export const isActiveRoute = (route, currentRoute) => {
  return route === currentRoute ? "active" : "";
};
