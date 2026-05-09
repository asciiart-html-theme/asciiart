import {getDomElement} from "../common";

class Sidebar {
  constructor(sidebarSelector) {
    this.sidebar = getDomElement(sidebarSelector);  
    this.breakpoint = window.getComputedStyle(document.documentElement).getPropertyValue('--md-width');
    if(!this.breakpoint){
      this.breakpoint = 1700
    }
    
    this.breakpoint = parseInt(this.breakpoint)
    
    this.button_selector = (id)=>`button[aria-controls="#${id}"], button[aria-controls="${id}"]`

    this.init();
  }

  init() {
    // Watch for window resizing to auto-reset the state
    window.addEventListener('resize', () => this.handleResize());

    const id = this.sidebar.id
    
    if(id){
        document.querySelectorAll( this.button_selector(id))
        .forEach((button)=>{
            if(button.classList.contains("button-close")){
               button.addEventListener("click",()=>this.hide(button));
               return; 
            }
            button.addEventListener("click",()=>this.toggle(button));
        })
    }

    this.updateButtons()
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
      this.sidebar.removeAttribute('aria-expanded');
      this.updateButtons()
    }
  }

  updateButtons(){
    const id = this.sidebar.id

    if(id){
      document.querySelectorAll(this.button_selector(id))
        .forEach((button)=>{
          button.dataset.elementHidden=!this.sidebar.checkVisibility()
          button.setAttribute("aria-expanded", this.sidebar.checkVisibility());
        })
    }
  }
}

export default Sidebar
