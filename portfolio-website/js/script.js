// Shared interactions for the portfolio website.
document.addEventListener("DOMContentLoaded", () => {
  // Keep the copyright year current.
  document.querySelectorAll(".current-year").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Accessible mobile navigation.
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");
  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      navigation.classList.toggle("is-open", !isOpen);
    });
    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  // Theme toggle: remembers the selection in this browser.
  const themeButtons = document.querySelectorAll(".theme-toggle");
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") document.body.classList.add("dark-theme");
  const updateThemeLabels = () => {
    const isDark = document.body.classList.contains("dark-theme");
    themeButtons.forEach((button) => {
      button.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
      button.textContent = isDark ? "☼" : "◐";
    });
  };
  updateThemeLabels();
  themeButtons.forEach((button) => button.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("portfolio-theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    updateThemeLabels();
  }));

  // Project category filters on projects.html.
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".filterable");
  const emptyMessage = document.querySelector(".filter-empty");
  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((button) => button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      let visibleCount = 0;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      projectCards.forEach((card) => {
        const visible = filter === "all" || card.dataset.category === filter;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      if (emptyMessage) emptyMessage.hidden = visibleCount > 0;
    }));
  }

  // Frontend-only form validation/demo. No data is sent to a server.
  const contactForm = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");
  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        formStatus.textContent = "Please complete the required fields with valid information.";
        formStatus.classList.add("is-error");
        return;
      }
      formStatus.classList.remove("is-error");
      formStatus.textContent = "Your fields look good! This demo form does not send messages yet. Connect a backend or form service to enable delivery.";
      contactForm.reset();
    });
  }
});