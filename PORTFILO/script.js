"use strict";

/* =========================================================
   CONTENT (edit here; the page is rendered from this data)
   ========================================================= */
const GITHUB_PROFILE = "https://github.com/Srinivas0087";

// Optional: paste a Formspree / Web3Forms endpoint to receive messages directly.
// Left empty, the form opens the visitor's email app addressed to you (mailto fallback).
const FORM_ENDPOINT = "";
const CONTACT_EMAIL = "srinivasdondadi0087@gmail.com";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";
const techSkills = [
  { name: "HTML5", icon: "html5/html5-original.svg" },
  { name: "CSS3", icon: "css3/css3-original.svg" },
  { name: "JavaScript", icon: "javascript/javascript-original.svg" },
  { name: "Python", icon: "python/python-original.svg" },
  { name: "Django", icon: "django/django-plain.svg", adapt: true },
  { name: "MySQL", icon: "mysql/mysql-original.svg" },
  { name: "OpenCV", icon: "opencv/opencv-original.svg" },
  { name: "TensorFlow", icon: "tensorflow/tensorflow-original.svg" },
];
const tools = [
  { name: "Git", icon: "git/git-original.svg" },
  { name: "GitHub", icon: "github/github-original.svg", adapt: true },
  { name: "VS Code", icon: "vscode/vscode-original.svg" },
  { name: "Netlify", icon: "netlify/netlify-original.svg" },
  { name: "Vercel", icon: "vercel/vercel-original.svg", adapt: true },
];

// TODO: replace each `github` value with the exact repository URL, and `cover` with a real screenshot.
const projects = [
  {
    title: "Qmusic Player",
    cover: "assets/projects/qmusic.svg",
    description: "A responsive web music player, deployed live on Netlify.",
    stack: ["HTML", "CSS", "JavaScript"],
    github: GITHUB_PROFILE + "?tab=repositories",
    live: "https://qmusicplayer.netlify.app/",
  },
  {
    title: "Master Learn",
    cover: "assets/projects/masterlearn.svg",
    description: "A learning-focused web application, deployed live on Netlify.",
    stack: ["HTML", "CSS", "JavaScript"],
    github: GITHUB_PROFILE + "?tab=repositories",
    live: "https://masterlearn.netlify.app/",
  },
  {
    title: "Object Detection Web App",
    cover: "assets/projects/objdetect.svg",
    description: "Real-time object detection in the browser: upload an image and detect multiple objects with a YOLOv5 model served by Django.",
    stack: ["Python", "Django", "YOLOv5", "OpenCV", "TensorFlow"],
    github: GITHUB_PROFILE + "?tab=repositories",
    live: "", // add a deployed URL or a demo video link; the button stays disabled until set
  },
];

/* =========================================================
   HELPERS
   ========================================================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Skills & tools ---------- */
function renderChips(list, target) {
  target.innerHTML = list.map((s) => `
    <li class="chip">
      <img src="${DEVICON + s.icon}" alt="" width="44" height="44" loading="lazy" class="${s.adapt ? "adapt" : ""}" />
      <span>${esc(s.name)}</span>
    </li>`).join("");
  // If a logo fails to load, fall back to a letter badge so the layout never breaks.
  $$("img", target).forEach((img) => img.addEventListener("error", () => {
    const m = document.createElement("div");
    m.className = "mono"; m.textContent = img.nextElementSibling.textContent.charAt(0);
    img.replaceWith(m);
  }));
}
renderChips(techSkills, $("#tech-skills"));
renderChips(tools, $("#tools"));

/* ---------- Projects (first 3 shown, rest behind "View more") ---------- */
const grid = $("#project-grid");
const moreBtn = $("#more-btn");
const VISIBLE = 3;
let expanded = false;

function projectCard(p) {
  const demo = p.live
    ? `<a class="btn btn-primary btn-sm" href="${esc(p.live)}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>`
    : `<span class="btn btn-outline btn-sm disabled" aria-disabled="true"><i class="fa-solid fa-clock"></i> Demo soon</span>`;
  return `
    <article class="card reveal">
      <div class="card-img"><img src="${esc(p.cover)}" alt="${esc(p.title)} cover" loading="lazy" width="640" height="360" /></div>
      <div class="card-body">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.description)}</p>
        <ul class="tags">${p.stack.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <div class="card-actions">
          <a class="btn btn-outline btn-sm" href="${esc(p.github)}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> GitHub</a>
          ${demo}
        </div>
      </div>
    </article>`;
}
function renderProjects() {
  const list = expanded ? projects : projects.slice(0, VISIBLE);
  grid.innerHTML = list.map(projectCard).join("");
  moreBtn.hidden = projects.length <= VISIBLE;
  moreBtn.textContent = expanded ? "View less" : "View more";
  observeReveals();
}
moreBtn.addEventListener("click", () => { expanded = !expanded; renderProjects(); });

/* ---------- Scroll reveal ---------- */
let io;
function observeReveals() {
  if (!("IntersectionObserver" in window)) { $$(".reveal").forEach((e) => e.classList.add("visible")); return; }
  io = io || new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  $$(".reveal:not(.visible)").forEach((e) => io.observe(e));
}
renderProjects();

/* ---------- Theme toggle ---------- */
const root = document.documentElement;
const themeBtn = $("#theme-toggle");
function paintThemeIcon() {
  themeBtn.innerHTML = root.dataset.theme === "dark" ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.content = root.dataset.theme === "dark" ? "#0b1020" : "#f6f7fb";
}
themeBtn.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  paintThemeIcon();
});
paintThemeIcon();

/* ---------- Mobile menu ---------- */
const menuBtn = $("#menu-btn");
const navLinks = $("#nav-links");
function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
}
menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
$$("a", navLinks).forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
window.addEventListener("resize", () => { if (innerWidth > 860) setMenu(false); });

/* ---------- Navbar state, active link (scroll-spy), back-to-top ---------- */
const navbar = $("#navbar");
const toTop = $("#to-top");
const sections = $$("main section[id]");
const links = $$('.nav-links a[href^="#"]');
function onScroll() {
  navbar.classList.toggle("scrolled", scrollY > 10);
  toTop.hidden = scrollY < 600;
  let current = sections[0].id;
  sections.forEach((s) => { if (scrollY >= s.offsetTop - 120) current = s.id; });
  links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- Contact form validation ---------- */
const form = $("#contact-form");
const status = $("#form-status");
const rules = {
  name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."),
  subject: (v) => (v.trim().length >= 3 ? "" : "Please add a subject."),
  message: (v) => (v.trim().length >= 10 ? "" : "Message should be at least 10 characters."),
};
function check(field) {
  const msg = rules[field.name](field.value);
  field.closest(".field").classList.toggle("invalid", !!msg);
  $(`.err[data-for="${field.name}"]`).textContent = msg;
  field.setAttribute("aria-invalid", !!msg);
  return !msg;
}
$$("input, textarea", form).forEach((f) => f.addEventListener("blur", () => check(f)));
$$("input, textarea", form).forEach((f) => f.addEventListener("input", () => { if (f.closest(".invalid")) check(f); }));

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.className = "status"; status.textContent = "";
  const fields = $$("input, textarea", form);
  const ok = fields.map(check).every(Boolean);
  if (!ok) { fields.find((f) => f.closest(".invalid"))?.focus(); return; }
  const data = Object.fromEntries(new FormData(form));

  if (FORM_ENDPOINT) {
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      form.reset(); status.className = "status ok"; status.textContent = "Thanks! Your message has been sent.";
    } catch { status.textContent = "Something went wrong. Please email me directly at " + CONTACT_EMAIL; }
  } else {
    const body = `${data.message}\n\n- ${data.name} (${data.email})`;
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
    status.className = "status ok"; status.textContent = "Opening your email app to send the message…";
  }
});

/* ---------- Misc ---------- */
$("#year").textContent = new Date().getFullYear();
observeReveals();
