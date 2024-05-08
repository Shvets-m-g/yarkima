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

      this.toggleDropdown = () => {
        this.dropdown.classList.toggle("show");
      };

      this.closeDropdown = (event) => {
        if (!event.target.matches(".dropbtn")) {
          if (this.dropdown.classList.contains("show")) {
            this.dropdown.classList.remove("show");
          }
        }
      };
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
    this.inputs.forEach((input) => {
      input.addEventListener("input", this.toggleLabel.bind(this));
      input.addEventListener("focus", this.onFocus.bind(this));
      input.addEventListener("blur", this.onBlur.bind(this));
      this.toggleLabel(input); // Вызываем toggleLabel для каждого поля ввода при инициализации
    });
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
