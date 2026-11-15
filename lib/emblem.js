// The church's cross-and-dove emblem (photorealistic image with a transparent background).
// `sizes` is the largest width, in CSS pixels, the emblem is shown at in that spot.

export function emblem(className = "emblem", label = "Cross and dove emblem", sizes = "150px") {
  const alt = label === "" ? "" : label;
  return `<img class="${className}" src="/assets/img/emblem-192.png" srcset="/assets/img/emblem-192.png 192w, /assets/img/emblem-640.png 640w" sizes="${sizes}" alt="${alt}" width="192" height="192" decoding="async">`;
}
