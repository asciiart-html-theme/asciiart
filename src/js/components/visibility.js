import {getDomElement} from "../common";

/**
 * Get the controlled element from original controller
 *
 * @param {HTMLElement} controllerElement 
 * @returns {HTMLElement} the element that controllerElementControlls
 */
function getControlElement(controllerElement){
  let elementToToggle = controllerElement.dataset.controlElement

  if(!elementToToggle){
    throw new Error("No element to toggle was provided as dataset upon buttol element")
  }

  elementToToggle = getDomElement(elementToToggle)

  if(!elementToToggle){
    throw new Error("No element to toggle was found")
  }

  return elementToToggle
}

/**
 * Upon Button clikc toggle visibility
 * It should be used upon an event listener.
 * 
 * Whether the element would be hidden or not is dewtermined via data attributes.
 * Please use css to hide the element itself.
 * 
 * @param {HTMLElement|string} button 
 */
function toggleVisibilityOnClick(button) {
  if(!button){
    throw new Error("Button Not defined")
  }

  button = getDomElement(button)
  let elementToToggle = getControlElement(button)
    
  let visible = elementToToggle.checkVisibility()
  elementToToggle.dataset.visible=!visible;
  button.dataset.elementHidden=!elementToToggle.checkVisibility()
}

/**
 * Upon Button click hide an element.
 * The element which needs to be hidden is determined via data attributes.
 * 
 * How an element it woulv be hodden is determined via data attributes.
 * 
 * @param {HTMLElement|string} button 
 */
function hideVisibilityOnClick(button){
  button = getDomElement(button)
  let elementToToggle = getControlElement(button)
  elementToToggle.dataset.visible=false;

  button.dataset.elementHidden=true
}
