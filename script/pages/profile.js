const swiper = new Swiper(".profile-gallery", {
  slidesPerView: "auto",
  spaceBetween: 0,
  loop: true,
  centeredSlides: true,
  preloadImages: true,
  pagination: {
    el: ".slider-pagination",
    type: "bullets",
    bulletClass: "slider-pagination-bullet",
    bulletActiveClass: "slider-pagination-bullet__active",
  },
  spaceBetween: 0,
  breakpoints: {},
});

const buttons = document.querySelectorAll(".profile-menu__link-show-more");
const template = document.getElementById("show-more-menu");

document.addEventListener("DOMContentLoaded", function () {
  if (buttons?.length) {
    for (const button of buttons) {
      tippy(button, {
        trigger: "click",
        placement: "bottom-center",
        theme: "light",
        content: template.innerHTML,
        // hideOnClick: false,
      });
    }
  }
});
