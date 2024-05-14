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
    document.addEventListener("keydown", (event) => {
      if (event.keyCode === 27) {
        this.close(event);
      }
    });
  }

  open() {
    this.modal.classList.add("show");
    this.overlay.classList.add("show");
    document.body.classList.add("disabled-scroll");
  }

  close(event) {
    event.preventDefault();
    this.modal.classList.remove("show");
    this.overlay.classList.remove("show");
    document.body.classList.remove("disabled-scroll");
  }
}

class Tabs {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.buttons = this.container.querySelectorAll(".tabs__button");
    this.tabs = this.container.querySelectorAll(".tabs__content");
    console.log("tabs, this", this);
    this.buttons.forEach((button) => {
      button.addEventListener("click", () => this.openTab(button));
    });
  }

  openTab(clickedButton) {
    const tabName = clickedButton.dataset.tab;
    this.tabs.forEach((tab) => {
      console.log("tabs", tab, tab.dataset.tab, tabName);
      if (tab.dataset.tab === tabName) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
    this.buttons.forEach((button) => {
      if (button.dataset.tab === tabName) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }
}
