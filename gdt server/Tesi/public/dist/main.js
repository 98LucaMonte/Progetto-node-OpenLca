"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
/*
const header:HTMLElement | null = document.querySelector("#header")as HTMLElement | null;
const main:HTMLElement | null = document.querySelector("#main")as HTMLElement | null;
const footer:HTMLElement | null = document.querySelector("#footer")as HTMLElement | null;

if(header && main && footer){
    let app = new App(header,main,footer)
}*/
const contentPage = document.querySelector('#content');
if (contentPage) {
    let app = new app_js_1.App(contentPage);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBNEI7QUFFNUI7Ozs7Ozs7R0FPRztBQUVILE1BQU0sV0FBVyxHQUF5QixRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBeUIsQ0FBQztBQUNyRyxJQUFHLFdBQVcsRUFBQyxDQUFDO0lBQ1osSUFBSSxHQUFHLEdBQUcsSUFBSSxZQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbkMsQ0FBQyJ9