function getDomElement(element) {
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

export default {
    getDomElement
};