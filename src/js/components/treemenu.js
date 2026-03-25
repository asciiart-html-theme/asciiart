import {getDomElement} from "../common";

class Treemenu {
  constructor(selector) {
    this.root = getDomElement(selector);
    if (!this.root) return;

    // Initialize all buttons
    this.buttons = this.root.querySelectorAll("li > button");
    this.buttons.forEach(button => {
      // Hide nested ul initially
      const submenu = button.nextElementSibling;
      if (submenu && submenu.tagName === "UL") {
        submenu.style.display = "none";
      }

      // Attach click handler
      button.addEventListener("click", () => this.toggleMenu(button));
    });
  }

  toggleMenu(button) {
    const submenu = button.nextElementSibling;
    if (!submenu || submenu.tagName !== "UL") return;

    // Collapse all other submenus (optional)
    this.buttons.forEach(btn => {
      const otherSubmenu = btn.nextElementSibling;
      if (otherSubmenu !== submenu && otherSubmenu.tagName === "UL") {
        otherSubmenu.style.display = "none";
        btn.setAttribute("aria-expanded", "false");
      }
    });

    // Toggle clicked submenu
    const isOpen = submenu.style.display === "block";
    submenu.style.display = isOpen ? "none" : "block";
    button.setAttribute("aria-expanded", !isOpen);
  }
}


export default Treemenu
