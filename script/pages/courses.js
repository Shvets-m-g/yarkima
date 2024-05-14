const sortDropdown1 = new Dropdown("sort__dropdown-1");
const sortDropdown2 = new Dropdown("sort__dropdown-2");
//collapse

document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth < 768) {
    new Modal("sorting-modal");
    new Modal("filter-modal");
  }
});
