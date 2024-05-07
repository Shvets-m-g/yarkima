const sortDropdown1 = new Dropdown("sort__dropdown-1");
const sortDropdown2 = new Dropdown("sort__dropdown-2");
//collapse
const triggers = Array.from(
  document.querySelectorAll('[data-toggle="collapse"]')
);

window.addEventListener(
  "click",
  (ev) => {
    const elm = ev.target;
    if (triggers.includes(elm)) {
      const selector = elm.getAttribute("data-target");
      console.log("selector", elm);
      collapse(selector, elm, "toggle");
    }
  },
  false
);

const fnmap = {
  toggle: "toggle",
  show: "add",
  hide: "remove",
};
const collapse = (selector, elm, cmd) => {
  elm.classList.toggle("show");
  const targets = Array.from(document.querySelectorAll(selector));
  targets.forEach((target) => {
    target.classList[fnmap[cmd]]("show");
  });
};

const swiper = new Swiper(".reviews-slider", {
  slidesPerView: 3,
  spaceBetween: 16,
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
  },
});
