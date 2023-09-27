import { minify } from "terser";

export const makeScript = async (func) => {
  const iife = `(${func.toString()})()`;
  const result = await minify(iife);
  return `${result.code}`;
};

export const trim = (style) => {
  return style.replaceAll("\n", "").replaceAll("  ", "").trim();
};
