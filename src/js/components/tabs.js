import {getDomElement} from "../common";


export default class TabController {
    constructor(wrapperElement){
        this.wrapperElement = getDomElement(wrapperElement)

        Array.from(this.wrapperElement.children).forEach(element => {
            const elementToControl = getDomElement(element.getAttribute('aria-controls'))

            if(!elementToControl){
                console.error("No element to controll skipping")
                return;
            }

            if(element.getAttribute('aria-selected')=="true"){
                elementToControl.dataset.hidden="true"
                return;
            }

            elementToControl.hidden="false"

            element.addEventListener("click",()=>this.select(element))
        });
    }

    select(clickedButton){
        Array.from(this.wrapperElement.children).forEach(element => {
            const elementToControl = getDomElement(element.getAttribute('aria-controls'))

            if(!elementToControl){
                console.error("No element to controll skipping")
                return;
            }

            if (element === clickedButton) {
                elementToControl.hidden="false"
                element.setAttribute('aria-selected','true')
                return
            }

            elementToControl.hidden="true"
            element.setAttribute('aria-selected','false')
        });
    }
}