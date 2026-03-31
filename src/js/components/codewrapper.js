import {getDomElement} from "../common";

class CodeWrapper {
    
    constructor(wrapperElement){
        this.wrapperElement = getDomElement(wrapperElement)

        this.copyButton = this.wrapperElement.querySelector(".copy")

        this.copyButton.addEventListener("click",()=>this.copyCodeIntoClipboard())

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

export default CodeWrapper;
