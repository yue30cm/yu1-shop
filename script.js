const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.classList.toggle("open");
  mainNav.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.classList.remove("open");
    mainNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const sections = document.querySelectorAll("main section[id]");
const updateActiveLink = () => {
  let currentId = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 160) currentId = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
};
window.addEventListener("scroll", updateActiveLink, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const searchInput = document.querySelector("#download-search");
const downloadItems = document.querySelectorAll(".download-item");
const emptyState = document.querySelector(".empty-state");

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  downloadItems.forEach((item) => {
    const isMatch = item.dataset.name.toLowerCase().includes(keyword);
    item.style.display = isMatch ? "" : "none";
    if (isMatch) visibleCount += 1;
  });

  emptyState.style.display = visibleCount ? "none" : "block";
});

const toast = document.querySelector(".toast");
let toastTimer;
const showToast = (message) => {
  toast.querySelector("span").textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
};

document.querySelector("#copy-discord").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("yue30cm");
    showToast("已複製 Discord ID");
  } catch {
    showToast("Discord ID：yue30cm");
  }
});
