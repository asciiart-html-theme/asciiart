import {getDomElement} from "../common";
import ScrollContainer from "./scrollcontainer";

export default class TabController {
    constructor(wrapperElement){
        this.wrapperElement = getDomElement(wrapperElement)

        Array.from(this.wrapperElement.children).forEach(element => {
            element.addEventListener("click",()=>this.select(element))
            const elementToControl = document.getElementById(element.getAttribute('aria-controls'))
            if(!elementToControl){
                console.error("No element to control skipping")
                return;
            }

            if(element.getAttribute('aria-selected')=="true"){
                elementToControl.hidden=false
                return;
            }

            elementToControl.hidden=true
        });

        this.initScroll()

    }

    initScroll(){
        const scrollContainer = this.wrapperElement.parentElement
        if(scrollContainer.classList.contains('scrolltab')){
            this.scrollContainer = new ScrollContainer(scrollContainer,this.wrapperElement)
        }
    }

    select(clickedButton){
        Array.from(this.wrapperElement.children).forEach(element => {
            const elementToControl = document.getElementById(element.getAttribute('aria-controls'))
            console.log("Controlling Element",elementToControl)

            if(!elementToControl){
                console.error("No element to controll skipping")
                return;
            }

            if (element === clickedButton) {
                console.log("Switching Element",elementToControl)
                elementToControl.hidden=false
                element.setAttribute('aria-selected','true')
                return
            }

            elementToControl.hidden=true
            element.setAttribute('aria-selected','false')
        });
    }
}