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
  });

  closeDeskButton?.addEventListener("click", function () {
    deskMenu.classList.remove("show");
  });
});
