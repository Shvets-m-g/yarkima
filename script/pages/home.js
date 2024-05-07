const swiper = new Swiper(".reviews-slider", {
  slidesPerView: 3,
  spaceBetween: 0,
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
      pagination: {
        el: ".slider-pagination",
        type: "bullets",
        bulletClass: "slider-pagination-bullet",
        bulletActiveClass: "slider-pagination-bullet__active",
      },
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
  },
});

document.addEventListener("DOMContentLoaded", function () {
  new Modal("course-modal");
});
