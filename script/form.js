const isDigit = (value) => {
  return /^\d+$/.test(value);
};

function restrictToOneDigit(event) {
  const input = event.target;
  const inputValue = input.value;
  const isSingleCharacter = inputValue.length === 1;
  if (!isDigit(inputValue)) {
    event.preventDefault();
    input.value = "";
    return;
  }
  if (!isSingleCharacter && event.data) {
    input.value = event.data;
  }
}

class CodeForm {
  codeInputsContainer;
  inputs;
  get code() {
    const code = [];
    this.inputs?.forEach((i) => {
      code.push(i.value);
    });
    return code;
  }

  constructor(className) {
    this.codeInputsContainer = document.querySelector(".form-code-inputs");
    this.inputs = this.codeInputsContainer.querySelectorAll(".code-input");
    for (const input of this.inputs) {
      input.addEventListener("input", (event) => {
        restrictToOneDigit(event);
      });
      input.addEventListener("keyup", (event) => {
        const nextInput = input.nextElementSibling;
        const code = event.keyCode || event.which;

        if (event.key !== event.target.value && isDigit(event.key)) {
          event.target.value = event.key;
        }
        if (nextInput && code && isDigit(event.key)) {
          nextInput.focus();
        }
      });

      input.addEventListener("paste", (event) => {
        this.onPaste(event);
      });
    }
  }

  onPaste(event) {
    event.preventDefault();
    let pasted = event.clipboardData.getData("text");
    const code = pasted.replace(/\D/g, ""); //.
    const codeArray = Array.from(code).map((code, index) => ({ code, index }));
    codeArray.slice(6);

    if (codeArray.length) {
      for (const { code, index } of codeArray) {
        this.inputs[index].value = code;
      }
      if (this.inputs[codeArray.length]) {
        this.inputs[codeArray.length].focus();
      } else {
        this.inputs[codeArray.length - 1].focus();
      }
    }
  }
}

class Dropdown {
  constructor(dropdownId) {
    this.dropdown = document.getElementById(dropdownId);
    if (this.dropdown) {
      this.dropdownContent = this.dropdown.querySelector(
        ".form-dropdown__content"
      );

      console.log("this.dropdown", this.dropdown);
      this.toggleDropdown = () => {
        if (this.dropdown.classList.contains("show")) {
          this.dropdown.classList.remove("show");
        } else {
          this.dropdown.classList.add("show");
          window.addEventListener("click", this.closeDropdown);
        }
      };

      this.closeDropdown = (event) => {
        if (!event.target.closest(`#${dropdownId}`)) {
          this.dropdown.classList.remove("show");
          window.removeEventListener("click", this.closeDropdown);
        }
      };

      // this.closeDropdown = (event) => {
      //   if (!event.target.matches(".dropbtn")) {
      //     if (this.dropdown.classList.contains("show")) {
      //       this.dropdown.classList.remove("show");
      //     }
      //   }
      // };
      // this.toggleDropdown = this.toggleDropdown.bind(this);
      // this.closeDropdown = this.closeDropdown.bind(this);

      this.dropdown
        .querySelector(".form-dropdown__button")
        .addEventListener("click", this.toggleDropdown);

      window.addEventListener("click", this.closeDropdown);
    }
  }
}

class PasswordToggler {
  constructor(selector) {
    this.passwordInput = document.querySelector(selector);
    this.toggleButton = this.passwordInput.nextElementSibling;
    this.toggleButton.addEventListener("click", this.toggle.bind(this));
  }

  toggle(event) {
    event.preventDefault();
    this.passwordInput.type =
      this.passwordInput.type === "password" ? "text" : "password";
    this.toggleButton.classList.toggle("active");
  }
}

class FloatingLabel {
  constructor(selector) {
    this.inputs = document.querySelectorAll(selector);
    this.labels = document.querySelectorAll(".form-input__label");
    if (this.labels?.length) {
      this.inputs.forEach((input) => {
        input.addEventListener("input", this.toggleLabel.bind(this));
        input.addEventListener("focus", this.onFocus.bind(this));
        input.addEventListener("blur", this.onBlur.bind(this));
        this.toggleLabel(input);
      });
    }
  }

  toggleLabel(input) {
    if (input.value !== "") {
      input.classList.add("active");
    } else {
      input.classList.remove("active");
    }
  }

  onFocus(event) {
    const input = event.target;
    input.classList.add("focused");
    this.labels.forEach((label) => {
      if (label.getAttribute("for") === input.id) {
        label.classList.add("active");
      }
    });
  }

  onBlur(event) {
    const input = event.target;
    input.classList.remove("focused");
    if (input.value === "") {
      this.labels.forEach((label) => {
        if (label.getAttribute("for") === input.id) {
          label.classList.remove("active");
        }
      });
    }
  }
}

const floatingLabel = new FloatingLabel(".form-input input");

class VariantSelector {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.variants = this.container.querySelectorAll(".form-variant");
    this.selectedVariantIndex = null;

    this.init();
  }

  init() {
    this.loadSelectedVariantIndex();
    this.variants.forEach((variant, index) => {
      variant.addEventListener("click", () => {
        this.selectVariant(index);
      });
    });
  }

  selectVariant(index) {
    this.clearSelection();
    this.variants[index].classList.add("active");
    this.selectedVariantIndex = index;
    this.saveSelectedVariantIndex();
  }

  clearSelection() {
    this.variants.forEach((variant) => {
      variant.classList.remove("active");
    });
  }

  saveSelectedVariantIndex() {
    localStorage.setItem("selectedVariantIndex", this.selectedVariantIndex);
  }

  loadSelectedVariantIndex() {
    const savedIndex = localStorage.getItem("selectedVariantIndex");
    if (savedIndex !== null) {
      this.selectVariant(parseInt(savedIndex));
    }
  }
}

class CustomSelect {
  constructor(selectElement) {
    this.selectElement = selectElement; // document.querySelector(selector);
    this.dropdown = document.createElement("div");
    this.dropdown.classList.add("form-select__container");
    this.init();
  }

  init() {
    this.selectElement.style.display = "none";
    const dropdownContent = this.generateDropdownContent();
    this.dropdown.appendChild(dropdownContent);
    this.selectElement.parentNode.insertBefore(
      this.dropdown,
      this.selectElement.nextSibling
    );

    this.dropdown.addEventListener("click", (event) => {
      if (event.target.classList.contains("form-select__option")) {
        this.selectOption(event.target);
      }
      this.toggleDropdown();
    });
    // const floatingLabel = new FloatingLabel(".form-input input");
  }

  generateDropdownContent() {
    const customSelectContainer = document.createElement("div");
    customSelectContainer.classList.add("form-select");
    // console.log(
    //   "customsClasses",
    //   customsClasses,
    //   // String(customsClasses).contains("sm")
    // );
    // customSelectContainer.classList.add(customsClasses);

    const customSelected = document.createElement("div");
    customSelected.classList.add("form-selected");
    customSelected.classList.add("form-input");
    customSelected.classList.add("with-label");

    const customsClasses =
      this.selectElement.getAttribute("data-classes") || "";
    if (customsClasses) {
      customSelectContainer.classList.add(customsClasses);
    }

    const selectedInput = document.createElement("input");
    const id = this.selectElement.getAttribute("data-id") || "";

    selectedInput.id = id || "form-select-input";
    selectedInput.classList.add("form-select__input");
    selectedInput.type = "text";
    const placeholder =
      this.selectElement.getAttribute("data-placeholder") || "";

    const label = document.createElement("label");
    label.htmlFor = "form-select-input";
    label.innerHTML = placeholder;
    label.classList.add("form-input__label");

    customSelected.appendChild(selectedInput);
    customSelected.appendChild(label);

    const customOptions = document.createElement("div");
    customOptions.classList.add("form-select__options");

    Array.from(this.selectElement.children[0]).forEach((option) => {
      if (option.value) {
        const customOption = document.createElement("div");
        customOption.classList.add("form-select__option");
        customOption.setAttribute("data-value", option.value);
        customOption.textContent = option.textContent;

        customOptions.appendChild(customOption);
      }
    });

    customSelectContainer.appendChild(customSelected);
    customSelectContainer.appendChild(customOptions);
    return customSelectContainer;
  }
  toggleDropdown() {
    this.dropdown.classList.toggle("show");
  }

  selectOption(option) {
    const value = option.getAttribute("data-value");
    this.selectElement.value = value;
    this.dropdown.querySelector(".form-selected input").value =
      option.textContent;
    this.dropdown.querySelector(".form-input__label").classList.add("active");
  }
}
