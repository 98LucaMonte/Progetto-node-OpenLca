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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLFVBQVUsQ0FBQTtBQUU1Qjs7Ozs7OztHQU9HO0FBRUgsTUFBTSxXQUFXLEdBQXlCLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUF5QixDQUFDO0FBQ3JHLElBQUcsV0FBVyxFQUFDLENBQUM7SUFDWixJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNuQyxDQUFDIn0=