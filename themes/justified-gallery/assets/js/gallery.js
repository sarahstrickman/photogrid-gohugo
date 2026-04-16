const gallery = document.getElementById("gallery");
let containerWidth = 0;

const GAP = 10; // in pixels
const TARGET_COL_WIDTH = 320;

function updateGallery(force = false) {
  if (!gallery) return;

  const items = gallery.querySelectorAll(".gallery-item");
  const visibleItems = [];

  items.forEach((item) => {
    if (item.style.display === "none") return;
    visibleItems.push(item);
  });

  if (visibleItems.length === 0) {
    gallery.style.height = "0px";
    gallery.style.visibility = "visible";
    return;
  }

  const newWidth = gallery.getBoundingClientRect().width;
  if (!force && containerWidth === newWidth) return;
  containerWidth = newWidth;

  // Calculate number of columns
  const numCols = Math.max(1, Math.round(containerWidth / TARGET_COL_WIDTH));
  const colWidth = (containerWidth - GAP * (numCols - 1)) / numCols;

  // Track the height of each column
  const colHeights = new Array(numCols).fill(0);

  visibleItems.forEach((item) => {
    // Find shortest column
    const col = colHeights.indexOf(Math.min(...colHeights));

    const img = item.querySelector("img");
    const aspect =
      parseFloat(img.getAttribute("width")) / parseFloat(img.getAttribute("height"));
    const itemHeight = colWidth / aspect;

    const left = col * (colWidth + GAP);
    const top = colHeights[col];

    item.style.position = "absolute";
    item.style.width = colWidth + "px";
    item.style.height = itemHeight + "px";
    item.style.top = top + "px";
    item.style.left = left + "px";

    colHeights[col] = top + itemHeight + GAP;
  });

  gallery.style.position = "relative";
  gallery.style.height = Math.max(...colHeights) - GAP + "px";
  gallery.style.visibility = "visible";
}

export { updateGallery };

if (gallery) {
  window.addEventListener("resize", () => updateGallery());
  window.addEventListener("orientationchange", () => updateGallery());

  // Call twice to adjust for scrollbars appearing after first call
  updateGallery();
  updateGallery();
}
