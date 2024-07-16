import { maxAdvancedTopicValue } from "./constants";

export function capitalize(str: string) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "Input";
}

export function getFavicon(url: string) {
  try {
    const result = new URL(url).origin;
    return "https://s2.googleusercontent.com/s2/favicons?domain=" + result;
  } catch {
    return "https://otherweb.com/";
  }
}

export function convertToOrigin(url: string) {
  try {
    return new URL(url).origin;
  } catch {
    return "https://otherweb.com/";
  }
}

export const slugify = require("slugify");

export const normalizeTopicValue = (value: number) =>
  Math.round((value * maxAdvancedTopicValue) / 100);

export function truncate(str: string, maxlength: number) {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
}
