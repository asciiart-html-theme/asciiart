import {Treemenu,Sidebar,CodeWrapper} from '@pc-magas/asciiart';

document.addEventListener("DOMContentLoaded", () => {
    new Treemenu(".treemenu");
    new Sidebar("#sidebar");
    new CodeWrapper("#codewrapper");
});