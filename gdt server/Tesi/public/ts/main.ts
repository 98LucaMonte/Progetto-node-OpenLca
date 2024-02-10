import {App} from "./app.js"

/*
const header:HTMLElement | null = document.querySelector("#header")as HTMLElement | null;
const main:HTMLElement | null = document.querySelector("#main")as HTMLElement | null;
const footer:HTMLElement | null = document.querySelector("#footer")as HTMLElement | null;

if(header && main && footer){
    let app = new App(header,main,footer)
}*/

const contentPage: HTMLDivElement| null = document.querySelector('#content')as HTMLDivElement | null;
if(contentPage){
    let app = new App(contentPage);
}