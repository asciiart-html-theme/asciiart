import {getDomElement} from "../common";

class Treemenu {
  constructor(selector) {
    this.root = getDomElement(selector);
    if (!this.root) return;

    // Initialize all buttons
    this.buttons = this.root.querySelectorAll("li > button");
    this.buttons.forEach(button => {
      button.addEventListener("click", () => this.toggleMenu(button));
    });
  }

  toggleMenu(button) {
    const submenu = button.nextElementSibling;
    const parent = button.parentNode
    
    const visible=submenu.checkVisibility() ? "false" : "true"    
    parent.dataset.visible = visible;
    
  }
}

export default Treemenu

if (typeof window !== "undefined") {
  window.Treemenu = Treemenu;
}
