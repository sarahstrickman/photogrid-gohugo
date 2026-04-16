import justifiedLayout from "../references/justified-layout/lib/index.js";

const gallery = document.getElementById("gallery");

if (gallery) {
  let containerWidth = 0;
  const items = gallery.querySelectorAll(".gallery-item");

  const aspectRatios = Array.from(items).map((item) => {
    const img = item.querySelector("img");
    return parseFloat(img.getAttribute("width")) / parseFloat(img.getAttribute("height"));
  });

  function updateGallery() {
    const newWidth = gallery.getBoundingClientRect().width;
    if (containerWidth === newWidth) return;
    containerWidth = newWidth;

    const layout = justifiedLayout(aspectRatios, {
      containerWidth: containerWidth,
      containerPadding: 0,
      boxSpacing: 8,
      targetRowHeight: 288,
      targetRowHeightTolerance: 0.25,
    });

    items.forEach((item, i) => {
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

  window.addEventListener("resize", updateGallery);
  window.addEventListener("orientationchange", updateGallery);

  // Call twice to adjust for scrollbars appearing after first call
  updateGallery();
  updateGallery();
}
