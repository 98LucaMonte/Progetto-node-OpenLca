import App from './app';
const header = document.querySelector("#header");
const main = document.querySelector("#main");
const footer = document.querySelector("#footer");
if (header && main && footer) {
    const app = new App(header, main, footer);
}
