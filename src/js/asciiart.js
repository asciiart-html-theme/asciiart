import Treemenu  from "./components/treemenu";
import Sidebar from "./components/sidebar";
import {CodeWrapper,autoinit as autoInitCodewrapper} from "./components/codewrapper";

const autoinit={
  codewrapper:autoInitCodewrapper,
};

// Export them so they appear in the AsciiArt global
export { 
  Treemenu,
  Sidebar,
  CodeWrapper,
  autoinit,
};
