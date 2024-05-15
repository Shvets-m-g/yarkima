const headerDropdown = new Dropdown("header__dropdown");

document.addEventListener("DOMContentLoaded", function () {
  const burgerButton = document.querySelector(".header__mob-burger");
  const mobileMenu = document.getElementById("header-mob-menu");
  const closeButton = mobileMenu?.querySelector(".mob-header__button-close");

  burgerButton?.addEventListener("click", function () {
    mobileMenu.classList.toggle("show");
    document.body.classList.toggle("disabled-scroll");
  });

  closeButton?.addEventListener("click", function () {
    mobileMenu.classList.remove("show");
    document.body.classList.remove("disabled-scroll");
  });

  const burgerDescButton = document.querySelector(".header__desk-burger");
  const deskMenu = document.getElementById("header-menu");
  const closeDeskButton = deskMenu.querySelector(".menu-header__button-close");

  burgerDescButton?.addEventListener("click", function () {
    deskMenu.classList.toggle("show");
    const closeMenuHandler = function (event) {
      if (
        !deskMenu.contains(event.target) &&
        !burgerDescButton.contains(event.target)
      ) {
        deskMenu.classList.remove("show");
        document.removeEventListener("click", closeMenuHandler);
      }
    };
    document.addEventListener("click", closeMenuHandler);
  });

  closeDeskButton?.addEventListener("click", function () {
    deskMenu.classList.remove("show");
  });
});

// //collapse
const mainTriggers = Array.from(
  document.querySelectorAll('[data-toggle="collapse"]')
);

document.addEventListener(
  "click",
  (ev) => {
    const elm = ev.target;
    if (mainTriggers.includes(elm)) {
      const selector = elm.getAttribute("data-target");
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

// const mainTriggers = Array.from(
//   document.querySelectorAll('[data-toggle="collapse"]')
// );

// const handleClickOrTouch = (ev) => {
//   const elm = ev.target;
//   if (mainTriggers.includes(elm)) {
//     const selector = elm.getAttribute("data-target");
//     collapse(selector, elm, "toggle");
//   }
// };

// const eventType = "ontouchstart" in window ? "touchstart" : "click";

// window.addEventListener(eventType, handleClickOrTouch, false);

// const fnmap = {
//   toggle: "toggle",
//   show: "add",
//   hide: "remove",
// };

// const collapse = (selector, elm, cmd) => {
//   elm.classList.toggle("show");
//   const targets = Array.from(document.querySelectorAll(selector));
//   targets.forEach((target) => {
//     target.classList[fnmap[cmd]]("show");
//   });
// };
