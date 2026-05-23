const STRIPE_LINKS = {
  // Podmień poniższe adresy na finalne linki płatności z panelu Stripe.
  "wizytowka-basic": "https://buy.stripe.com/14A9AMg9U2O1gd68tHeAg01",
  "wizytowka-plus": "https://buy.stripe.com/5kQ3co0aW88lgd67pDeAg03",
  "wizytowka-premium": "https://buy.stripe.com/aFa7sE6zkagt2mg7pDeAg04",
  "firma-basic": "https://buy.stripe.com/dRmaEQ8Hs1JX6CwfW9eAg05",
  "firma-premium": "https://buy.stripe.com/28E14g5vgdsF2mgcJXeAg06",
  "sklep-10": "https://buy.stripe.com/6oUcMY8Hs74h0e811feAg07",
  "sklep-25-plus": "https://buy.stripe.com/28E14g7Do9cp9OI11feAg09"
};

const CONTACT_EMAIL = "kontakt@twojadomena.pl";
const themeButtons = [...document.querySelectorAll("[data-theme-set]")];
const storedTheme = localStorage.getItem("siteTheme") || "light";

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("siteTheme", theme);
  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeSet === theme;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

setTheme(storedTheme);

themeButtons.forEach((button) => {
  button.addEventListener("click", () => setTheme(button.dataset.themeSet));
});

document.querySelectorAll("[data-plan]").forEach((link) => {
  const stripeUrl = STRIPE_LINKS[link.dataset.plan];
  link.href = stripeUrl || "#kontakt";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
