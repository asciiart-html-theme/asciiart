import {Treemenu,Sidebar,CodeWrapper} from 'asciiart';

document.addEventListener("DOMContentLoaded", () => {
    new Treemenu(".treemenu");
    new Sidebar("#sidebar");
    new CodeWrapper("#codewrapper");
});