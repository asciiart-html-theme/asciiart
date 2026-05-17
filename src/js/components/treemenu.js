import {getDomElement} from "../common";

export class Treemenu {
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
    parent.setAttribute('aria-expanded',visible)
  }
}

export function autoinit(){
  document.querySelectorAll(".treemenu").forEach((element)=>new Treemenu(element))
}

