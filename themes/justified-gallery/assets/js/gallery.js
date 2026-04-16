import justifiedLayout from "../references/justified-layout/lib/index.js";

const gallery = document.getElementById("gallery");
let containerWidth = 0;

function updateGallery(force = false) {
  if (!gallery) return;

  const items = gallery.querySelectorAll(".gallery-item");
  const visibleItems = [];
  const aspectRatios = [];

  items.forEach((item) => {
    if (item.style.display === "none") return;
    visibleItems.push(item);
    const img = item.querySelector("img");
    aspectRatios.push(
      parseFloat(img.getAttribute("width")) / parseFloat(img.getAttribute("height"))
    );
  });

  if (visibleItems.length === 0) {
    gallery.style.height = "0px";
    gallery.style.visibility = "visible";
    return;
  }

  const newWidth = gallery.getBoundingClientRect().width;
  if (!force && containerWidth === newWidth) return;
  containerWidth = newWidth;

  const layout = justifiedLayout(aspectRatios, {
    containerWidth: containerWidth,
    containerPadding: 0,
    boxSpacing: 8,
    targetRowHeight: 288,
    targetRowHeightTolerance: 0.25,
  });

  visibleItems.forEach((item, i) => {
    const box = layout.boxes[i];
    item.style.position = "absolute";
    item.style.width = box.width + "px";
    item.style.height = box.height + "px";
    item.style.top = box.top + "px";
    item.style.left = box.left + "px";
  });

  gallery.style.position = "relative";
  gallery.style.height = layout.containerHeight + "px";
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
