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
