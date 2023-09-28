import { minify } from "terser";
import CleanCSS from "clean-css";

export const makeScript = async (func) => {
  const iife = `(${func.toString()})()`;
  const result = await minify(iife);
  return result.code;
};

export const trim = (style) => {
  return new CleanCSS({}).minify(style).styles;
};
