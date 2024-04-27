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
const codeForm = new CodeForm(".form-code-inputs");
