
import App from './app';


const header:HTMLElement | null = document.querySelector("#header")as HTMLElement | null;
const main:HTMLElement | null = document.querySelector("#main")as HTMLElement | null;
const footer:HTMLElement | null = document.querySelector("#footer")as HTMLElement | null;

if(header && main && footer){
    const app = new App(header,main,footer);
}