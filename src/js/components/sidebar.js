import {getDomElement} from "../common";

class Sidebar {
  constructor(sidebarSelector, breakpoint = 1700) {
    this.sidebar = getDomElement(sidebarSelector);
    this.breakpoint = breakpoint;
    this.init();
  }

  init() {
    // Watch for window resizing to auto-reset the state
    window.addEventListener('resize', () => this.handleResize());


    const id = this.sidebar.id

    if(id){
        document.querySelectorAll(`button[data-control-element="#`+id+`"`)
        .forEach((button)=>{
            if(button.classList.contains("button-close")){
               button.addEventListener("click",()=>this.hide(button));
               return; 
            }
            button.addEventListener("click",()=>this.toggle(button));
        })
    }
  }

  toggle(button){
    let visible = this.sidebar.checkVisibility()
    this.sidebar.dataset.visible=!visible;
    this.updateButtons()
  }

  hide(button){
    this.sidebar.dataset.visible=false;
    this.updateButtons()
  }

  handleResize() {
    if (window.innerWidth > this.breakpoint) {
      this.sidebar.removeAttribute('data-visible');
      this.updateButtons()
    }
  }

  updateButtons(){
    const id = this.sidebar.id

    if(id){
      document.querySelectorAll(`button[data-control-element="#`+id+`"`)
        .forEach((button)=>{
          button.dataset.elementHidden=!this.sidebar.checkVisibility()
        })
    }
  }
}

export default Sidebar

if (typeof window !== "undefined") {
  window.Sidebar = Sidebar;
}
