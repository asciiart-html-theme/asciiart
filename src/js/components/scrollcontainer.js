import {getDomElement} from "../common";


export default class ScrollContainer {
    constructor(wrapperElement,targetElement){
        
        console.log(wrapperElement)

        this.wrapperElement = getDomElement(wrapperElement)
        this.targetElement = getDomElement(targetElement)
        const scrollAmount = 100;
        
        console.log(this.wrapperElement)

        this.wrapperElement.querySelectorAll(".scroll-btn").forEach(button => {
            button.addEventListener('click', () => {
                console.log(button)
                if(button.classList.contains('before')){
                    this.targetElement.scrollLeft -= scrollAmount;
                } else {
                    this.targetElement.scrollLeft += scrollAmount;
                }
            });
        });

    }
}