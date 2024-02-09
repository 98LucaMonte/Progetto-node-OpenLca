import { App } from "./app.js";
/*
const header:HTMLElement | null = document.querySelector("#header")as HTMLElement | null;
const main:HTMLElement | null = document.querySelector("#main")as HTMLElement | null;
const footer:HTMLElement | null = document.querySelector("#footer")as HTMLElement | null;

if(header && main && footer){
    let app = new App(header,main,footer)
}*/
const contentPage = document.querySelector('#content');
if (contentPage) {
    let app = new App(contentPage);
}
