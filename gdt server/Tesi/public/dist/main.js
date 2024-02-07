"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const header = document.querySelector("#header");
const main = document.querySelector("#main");
const footer = document.querySelector("#footer");
if (header && main && footer) {
    const app = new app_js_1.default(header, main, footer);
}
