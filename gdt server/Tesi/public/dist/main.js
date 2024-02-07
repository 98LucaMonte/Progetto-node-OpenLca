import { App } from "./app.js";
const header = document.querySelector("#header");
const main = document.querySelector("#main");
const footer = document.querySelector("#footer");
if (header && main && footer) {
    let app = new App(header, main, footer);
}
