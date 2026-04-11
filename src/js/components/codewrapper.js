import {getDomElement} from "../common";
import TabController from "./tabs"

export class CodeWrapper {
    
    constructor(wrapperElement){
        this.wrapperElement = getDomElement(wrapperElement)

        this.copyButton = this.wrapperElement.querySelector(".copy")
        if(this.copyButton){
            this.copyButton.addEventListener("click",()=>this.copyCodeIntoClipboard())
        }

        const tabSelector = this.wrapperElement.querySelector(".tab-button-container")
        
        if(tabSelector){
            console.debug("Init tab",tabSelector)
            this.tabSelector = new TabController(tabSelector);
        }
        
    }

    copyCodeIntoClipboard(){
        const codeElement = this.wrapperElement.querySelector("code")
        const code = codeElement.innerText.trim()
        navigator.clipboard.writeText(code)
            .then(() => {
                console.log("Code copied to clipboard!");
                // Optional: provide visual feedback
                this.copyButton.innerText = "Copied!";
                setTimeout(() => this.copyButton.innerText = "Copy", 2000);
            })
            .catch(err => {
                console.error("Failed to copy code: ", err);
            });
    }
}

export function autoinit(){
    document.querySelectorAll(".code-wrapper").forEach((element)=>new CodeWrapper(element))
}
