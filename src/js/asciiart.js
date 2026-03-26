import { toggleVisibilityOnClick, hideVisibilityOnClick } from "./components/visibility";
import  Treemenu  from "./components/treemenu";

// Export them so they appear in the AsciiArt global
export { 
  toggleVisibilityOnClick, 
  hideVisibilityOnClick, 
  Treemenu 
};

if (typeof window !== "undefined") {
  window.toggleVisibilityOnClick = toggleVisibilityOnClick;
  window.hideVisibilityOnClick = hideVisibilityOnClick;
  window.Treemenu = Treemenu;
}