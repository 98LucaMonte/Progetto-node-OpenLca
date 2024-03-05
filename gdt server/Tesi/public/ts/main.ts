import {App} from "./app.js" 
  
const contentPage: HTMLDivElement| null = document.querySelector('#content')as HTMLDivElement | null;
if(contentPage){
    let app = new App(contentPage);
} 