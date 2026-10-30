// Responsive navigation, demo form feedback, and dynamic copyright year.
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
  document.addEventListener("click", event => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");
if (form && status) form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  status.textContent = "Thanks! The demo form passed validation. No message was sent.";
  form.reset();
});
