import {getDomElement} from "../common";


export default class ScrollContainer {
    constructor(wrapperElement,targetElement){
        
        this.wrapperElement = getDomElement(wrapperElement)
        this.targetElement = getDomElement(targetElement)

        const scrollAmount = 100;
        
        console.log(this.wrapperElement)

        this.scrollButtons = this.wrapperElement.querySelectorAll(".scroll-btn")

        this.scrollButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log(button)
                if(button.classList.contains('before')){
                    this.targetElement.scrollLeft -= scrollAmount;
                } else {
                    this.targetElement.scrollLeft += scrollAmount;
                }
            });
        });

        window.addEventListener("resize", () => {
            this.updateButtons();
        });
        
        this.updateButtons();

    }

    updateButtons() {
        const hasOverflow =
            this.targetElement.scrollWidth > this.targetElement.clientWidth;

        console.log("Overflow",hasOverflow)

        this.scrollButtons.forEach(btn => {
            if(!hasOverflow){
                btn.style.display = "none";
            } else {
                btn.style.display = "";
            }
        });
    }
}