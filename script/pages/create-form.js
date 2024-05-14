let swiper = null;

function initSwiper() {
  if (window.innerWidth < 768) {
    swiper = new Swiper(".course-form__covers", {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      centeredSlides: true,
      pagination: {
        el: ".slider-pagination",
        type: "bullets",
        bulletClass: "slider-pagination-bullet",
        bulletActiveClass: "slider-pagination-bullet__active",
      },
    });
  } else {
    if (swiper !== null) {
      swiper.destroy();
      swiper = null;
    }
  }
}

window.addEventListener("load", initSwiper);

window.addEventListener("resize", () => {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(() => {
    initSwiper();
  }, 250);
});
