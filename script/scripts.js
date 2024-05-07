class Modal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.overlay = document.getElementById("overlay");
    this.closeButton = this.modal.querySelector(".modal-close");
    this.openButtons = document.querySelectorAll(
      `[data-modal-id="${modalId}"]`
    );
    if (this.openButtons?.length) {
      for (const button of this.openButtons) {
        button.addEventListener("click", this.open.bind(this));
      }
    }
    this.closeButton?.addEventListener("click", this.close.bind(this));
    this.overlay?.addEventListener("click", this.close.bind(this));
  }

  open() {
    this.modal.classList.add("show");
    this.overlay.classList.add("show");
    document.body.classList.add("disabled-scroll");
  }

  close() {
    this.modal.classList.remove("show");
    this.overlay.classList.remove("show");
    document.body.classList.remove("disabled-scroll");
  }
}
