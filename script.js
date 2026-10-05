const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "✕" : "☰";
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    if (menuButton) menuButton.textContent = "☰";
  });
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Portfolio items are managed in works.csv, so adding work does not require editing this file.
function parseCSV(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], next = text[i + 1];
    if (quoted) {
      if (c === '"' && next === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ""; }
    else if (c === '\n') { row.push(field.replace(/\r$/, "")); rows.push(row); row = []; field = ""; }
    else field += c;
  }
  if (field.length || row.length) { row.push(field.replace(/\r$/, "")); rows.push(row); }
  if (!rows.length) return [];
  const headers = rows.shift().map(h => h.trim().toLowerCase());
  return rows.filter(r => r.some(v => v.trim())).map(r => Object.fromEntries(headers.map((h, i) => [h, (r[i] || "").trim()])));
}

function safeImagePath(path) {
  // Local images should live in images/; external https URLs are also accepted.
  if (/^https:\/\//i.test(path)) return path;
  if (/^(images\/|assets\/)/i.test(path) && !path.includes('..')) return path;
  return "";
}
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function imageFor(item, className) {
  const path = safeImagePath(item.image || "");
  if (!path) return null;
  const img = el("img", className || "", "");
  img.src = path;
  img.alt = item.title || "Portfolio work";
  img.loading = "lazy";
  img.onerror = () => img.remove();
  return img;
}
function renderItem(item, index) {
  const category = (item.category || "").toLowerCase();
  const title = item.title || "Untitled work";
  const description = item.description || "";
  const label = item.label || category.toUpperCase();
  let card;
  if (category === "writing") {
    card = el("article", "work-card");
    const img = imageFor(item);
    if (img) card.append(img);
    const meta = el("div", "work-meta");
    meta.append(el("span", "", label.toUpperCase()), el("span", "", String(index + 1).padStart(2, "0")));
    card.append(meta, el("h4", "", title));
    if (description) card.append(el("p", "work-description", description));
  } else if (category === "landscapes") {
    card = el("article", "landscape-card");
    const img = imageFor(item);
    if (img) card.append(img);
    const info = el("div", "");
    info.append(el("span", "", label.toUpperCase()), el("h4", "", title));
    if (description) info.append(el("p", "work-description", description));
    card.append(info);
  } else {
    card = el("article", "art-card");
    const img = imageFor(item);
    if (img) card.append(img);
    else card.append(el("div", "art-placeholder", title));
    card.append(el("p", "", title));
    if (description) card.append(el("p", "work-description", description));
  }
  return card;
}
async function loadWorks() {
  const status = document.getElementById("gallery-status");
  try {
    const response = await fetch("works.csv", { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load works.csv");
    const items = parseCSV(await response.text());
    const allowed = new Set(["writing", "calligraphy", "portraits", "landscapes"]);
    const filtered = items.filter(item => allowed.has((item.category || "").toLowerCase()));
    document.querySelectorAll("[data-gallery]").forEach(gallery => {
      const category = gallery.dataset.gallery;
      gallery.replaceChildren();
      filtered.filter(item => item.category.toLowerCase() === category).forEach((item, i) => gallery.append(renderItem(item, i)));
      if (!gallery.children.length) gallery.append(el("p", "work-description", "New work will appear here when you add it to works.csv."));
    });
    if (status) status.textContent = "To add or update work, upload the image and add one row to works.csv in the repository.";
  } catch (error) {
    if (status) status.textContent = "The gallery list could not be loaded. Check that works.csv is in the same folder as index.html.";
    console.error(error);
  }
}
loadWorks();
