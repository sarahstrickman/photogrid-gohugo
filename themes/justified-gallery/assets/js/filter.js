import { updateGallery } from "./gallery.js";

const filterBtn = document.querySelector(".filter-btn");
const filterMenu = document.querySelector(".filter-menu");
const filterOverlay = document.querySelector(".filter-overlay");

if (filterBtn && filterMenu) {
  filterBtn.addEventListener("click", () => {
    const isOpen = filterBtn.getAttribute("aria-expanded") === "true";
    filterBtn.setAttribute("aria-expanded", isOpen ? "false" : "true");
    filterMenu.classList.toggle("open", !isOpen);
    filterOverlay.classList.toggle("open", !isOpen);
  });

  filterOverlay.addEventListener("click", () => {
    filterBtn.setAttribute("aria-expanded", "false");
    filterMenu.classList.remove("open");
    filterOverlay.classList.remove("open");
  });

  const checkboxes = filterMenu.querySelectorAll('input[type="checkbox"]');
  const gallery = document.getElementById("gallery");

  function applyFilters() {
    const selected = new Set();
    checkboxes.forEach((cb) => {
      if (cb.checked) selected.add(cb.value);
    });

    filterBtn.classList.toggle("active", selected.size < checkboxes.length);

    if (!gallery) return;

    const items = gallery.querySelectorAll(".gallery-item");
    items.forEach((item) => {
      const categories = (item.dataset.categories || "")
        .split(",")
        .filter(Boolean);
      const visible = categories.some((cat) => selected.has(cat));
      item.style.display = visible ? "" : "none";
    });

    updateGallery(true);
  }

  checkboxes.forEach((cb) => {
    cb.addEventListener("change", applyFilters);
  });

  const clearBtn = filterMenu.querySelector(".filter-clear-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      checkboxes.forEach((cb) => (cb.checked = false));
      applyFilters();
    });
  }

  const selectAllBtn = filterMenu.querySelector(".filter-all-btn");
  if (selectAllBtn) {
    selectAllBtn.addEventListener("click", () => {
      checkboxes.forEach((cb) => (cb.checked = true));
      applyFilters();
    });
  }
}
