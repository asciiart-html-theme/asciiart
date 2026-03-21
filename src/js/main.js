function getDomElement(element) {

  console.log(element instanceof HTMLElement);
  if (element instanceof HTMLElement){
    return element;
  } 

  if (typeof element === "string") {
    if (element.startsWith("#")) {
      return document.getElementById(element.slice(1));
    }
    return document.querySelector(element);
  }

  return null;
}

/**
 * This function toggles an element's visibility.
 * It should be used upon an event listener. 
 * @param {HTMLElement|string} button 
 */
function toggleSidebar(button) {

    if(!button){
        throw new Error("Button Not defined")
    }

    button = getDomElement(button)
    let elementToToggle = button.dataset.controlElement

    if(!elementToToggle){
        throw new Error("No element to toggle was provided as dataset upon buttol element")
    }

    elementToToggle = getDomElement(elementToToggle)

    if(!elementToToggle){
        throw new Error("No element to toggle was found")
    }
    
    console.log(elementToToggle.checkVisibility());

    if(elementToToggle.checkVisibility()){
       elementToToggle.style.display="none";
       button.dataset.elementHidden=true;
       return
    }

    console.log("Here");
    button.dataset.elementHidden=false;
    elementToToggle.style.display="block"
}