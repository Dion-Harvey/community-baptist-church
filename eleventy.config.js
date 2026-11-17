import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { renderIcon } from "./lib/icons.js";
import { emblem } from "./lib/emblem.js";

// Adds ?v=<content hash> to an asset URL so browsers fetch the new file
// whenever it changes, despite the long cache time in netlify.toml.
function versioned(url) {
  const hash = createHash("sha1").update(readFileSync("src" + url)).digest("hex").slice(0, 10);
  return `${url}?v=${hash}`;
}

const LAUNCH_FIELDS = [
  ["url", "Website address (url)"],
  ["phone", "Church phone number"],
  ["email", "Church email address"],
  ["pastor.name", "Pastor's name"],
  ["pastor.photo", "Pastor's photo"]
];

function lookup(obj, path) {
  return path.split(".").reduce((o, key) => (o == null ? undefined : o[key]), obj);
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addShortcode("icon", (name, className) => renderIcon(name, className));
  eleventyConfig.addShortcode("emblem", (className, label, sizes) => emblem(className, label, sizes));
  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  eleventyConfig.addFilter("v", versioned);
  eleventyConfig.addFilter("telHref", (phone) => "tel:" + String(phone || "").replace(/[^\d+]/g, ""));
  eleventyConfig.addFilter("mapsQuery", (a) => encodeURIComponent(`${a.street}, ${a.city}, ${a.state} ${a.zip}`));
  eleventyConfig.addFilter("upcoming", (events) => {
    const today = new Date().toISOString().slice(0, 10);
    return (events || [])
      .filter((e) => !e.date || e.date >= today)
      .sort((a, b) => String(a.date).localeCompare(String(b.date)));
  });
  eleventyConfig.addFilter("longDate", (iso) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  });

  eleventyConfig.on("eleventy.after", async () => {
    const { default: church } = await import("./src/_data/church.json", { with: { type: "json" } });
    const { default: staff } = await import("./src/_data/staff.json", { with: { type: "json" } });
    const missing = LAUNCH_FIELDS.filter(([path]) => !lookup(church, path)).map(([, label]) => label);
    staff.filter((p) => !p.name || !p.photo).forEach((p) => missing.push(`Staff name/photo: ${p.role} (src/_data/staff.json)`));
    if (missing.length) {
      console.log("\n[Launch checklist] Still missing (see README.md):\n  - " + missing.join("\n  - ") + "\n");
    }
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
