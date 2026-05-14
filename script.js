/* ─── IMAGE DATA ─── */
const images = [
  {
    id: 1,
    src: "https://picsum.photos/seed/arch1/800/600",
    title: "Urban Geometry",
    category: "Architecture",
    featured: true,
  },
  {
    id: 2,
    src: "https://picsum.photos/seed/nat1/800/600",
    title: "Into the Wild",
    category: "Nature",
    featured: false,
  },
  {
    id: 3,
    src: "https://picsum.photos/seed/port1/800/600",
    title: "Golden Hour",
    category: "Portrait",
    featured: false,
  },
  {
    id: 4,
    src: "https://picsum.photos/seed/travel1/800/600",
    title: "City of Mist",
    category: "Travel",
    featured: false,
  },
  {
    id: 5,
    src: "https://picsum.photos/seed/arch2/800/600",
    title: "Glass & Steel",
    category: "Architecture",
    featured: false,
  },
  {
    id: 6,
    src: "https://picsum.photos/seed/nat2/800/600",
    title: "Forest Silence",
    category: "Nature",
    featured: false,
  },
  {
    id: 7,
    src: "https://picsum.photos/seed/travel2/800/600",
    title: "Old Town Square",
    category: "Travel",
    featured: false,
  },
  {
    id: 8,
    src: "https://picsum.photos/seed/port2/800/600",
    title: "Quiet Reflection",
    category: "Portrait",
    featured: false,
  },
  {
    id: 9,
    src: "https://picsum.photos/seed/arch3/800/600",
    title: "Symmetry in Stone",
    category: "Architecture",
    featured: false,
  },
  {
    id: 10,
    src: "../Ace_one_piece.jpg",
    title: "Anime motivation",
    category: "Anime",
    featured: false,
  },
  {
    id: 11,
    src: "../Blackbeard_one_piece.jpg",
    title: "Anime motivation",
    category: "Anime",
    featured: false,
  },
  {
    id: 12,
    src: "../Doflamingo_one_piece.jpg",
    title: "Anime motivation",
    category: "Anime",
    featured: false,
  },
  {
    id: 13,
    src: "../Fujitora_one_piece.jpg",
    title: "Anime motivation",
    category: "Anime",
    featured: false,
  },
  {
    id: 14,
    src: "../Itachi_naruto.jpg",
    title: "Anime motivation",
    category: "Anime",
    featured: false,
  },
  {
    id: 15,
    src: "../Kakashi_naruto.jpg",
    title: "Anime motivation",
    category: "Anime",
    featured: false,
  },
  {
    id: 16,
    src: "../Khojoe_avatar.jpg",
    title: "personal avatar",
    category: "Avatar",
    featured: false,
  },
  {
    id: 17,
    src: "../Loki_one_piece(manga).jpg",
    title: "Manga motivation",
    category: "Manga",
    featured: true,
  },
  {
    id: 18,
    src: "../Madara_naruto.jpg",
    title: "Anime motivation",
    category: "Anime",
    featured: false,
  },
  {
    id: 19,
    src: "../Mikasa_aot.png",
    title: "Anime motivation",
    category: "Anime",
    featured: false,
  },
  {
    id: 20,
    src: "../Minato_naruto.jpg",
    title: "Anime motivation",
    category: "Anime",
    featured: false,
  },
  {
    id: 21,
    src: "../Naruto_naruto.jpg",
    title: "Anime motivation",
    category: "Anime",
    featured: false,
  },
  {
    id: 22,
    src: "../Rengoku.jpg",
    title: "Anime motivation",
    category: "Anime",
    featured: false,
  },
  {
    id: 23,
    src: "../Tanjiro_demon_slayer.jpg",
    title: "Anime motivation",
    category: "Anime",
    featured: false,
  },
  {
    id: 24,
    src: "../Zenitsu_demon_slayer.jpg",
    title: "Anime motivation",
    category: "Anime",
    featured: false,
  },
  {
    id: 25,
    src: "../Luffy(gear5)_one_piece.jpg",
    title: "Anime motivation",
    category: "Anime",
    featured: true,
  },
];

/* ─── STATE ─── */
let activeFilter = "All";
let activeLightboxIndex = null;

/* ─── DOM REFS ─── */
const grid = document.getElementById("galleryGrid");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbTitle = document.getElementById("lbTitle");
const lbCategory = document.getElementById("lbCategory");
const imageCount = document.getElementById("imageCount");
const emptyState = document.getElementById("emptyState");

/* ─── RENDER GALLERY ─── */
function renderGallery(filter) {
  const filtered =
    filter === "All" ? images : images.filter((img) => img.category === filter);

  grid.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.classList.add("show");
    imageCount.textContent = "0";
    return;
  }

  emptyState.classList.remove("show");
  imageCount.textContent = filtered.length;

  filtered.forEach((img, index) => {
    const item = document.createElement("div");
    item.className =
      "gallery-item" + (img.featured && filter === "All" ? " featured" : "");
    item.dataset.index = index;

    item.innerHTML = `
      <img src="${img.src}" alt="${img.title}" loading="lazy" />
      <div class="badge">${img.category}</div>
      <div class="caption">
        <div class="caption-title">${img.title}</div>
        <div class="caption-sub">${img.category}</div>
      </div>
    `;

    item.addEventListener("click", () => openLightbox(index, filtered));
    grid.appendChild(item);
  });
}

/* ─── LIGHTBOX ─── */
function openLightbox(index, filtered) {
  activeLightboxIndex = index;
  const img = filtered[index];
  lbImg.src = img.src;
  lbImg.alt = img.title;
  lbTitle.textContent = img.title;
  lbCategory.textContent = img.category;
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
  activeLightboxIndex = null;
}

/* ─── FILTER BUTTONS ─── */
function initFilters() {
  const categories = ["All", ...new Set(images.map((img) => img.category))];
  const filterContainer = document.getElementById("filters");

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (cat === "All" ? " active" : "");
    btn.textContent = cat;

    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = cat;
      renderGallery(cat);
    });

    filterContainer.appendChild(btn);
  });
}

/* ─── KEYBOARD & CLICK EVENTS ─── */
document.getElementById("lbClose").addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* ─── FOOTER YEAR ─── */
document.getElementById("year").textContent = new Date().getFullYear();

/* ─── INIT ─── */
initFilters();
renderGallery("All");
