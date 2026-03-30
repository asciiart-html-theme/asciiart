import {getDomElement} from "../common";

class CodeWrapper {
    
    constructor(wrapperElement){
        this.wrapperElement = getDomElement(wrapperElement)

        this.copyButton = this.wrapperElement.querySelector(".copy")

        this.copyButton.addEventListener("click",this.copyCodeIntoClipboard)

    }

    copyCodeIntoClipboard(){
        const codeElement = this.wrapperElement.querySelector("code")
        const code = codeElement.innerText
        console.log(code);
    }
}

export default CodeWrapper;