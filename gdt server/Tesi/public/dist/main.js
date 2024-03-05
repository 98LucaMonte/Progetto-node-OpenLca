import { App } from "./app.js";
const contentPage = document.querySelector('#content');
if (contentPage) {
    let app = new App(contentPage);
}
