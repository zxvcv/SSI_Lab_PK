require("../node_modules/bootstrap/dist/css/bootstrap.css")

/*
let licznik = 0;
let container = document.createElement("div");
container.classList.add("text-center", "p-3");
let msg = document.createElement("h1");

msg.classList.add("bg-primary", "text-white", "p-3");
msg.textContent = "Przycisk nie został kliknięty";

let button = document.createElement("button");
button.textContent = "Kliknij mnie";
button.classList.add("btn", "btn-secondary");

button.onclick = () => msg.textContent = `Przycisk klikniety: ${++licznik}`

container.appendChild(msg);
container.appendChild(button);
let app = document.getElementById("app");
app.parentElement.replaceChild(container, app);
*/

import Vue from "vue";
import mojKomponent from "./App";


new Vue({
    el: "#app",
    components: {"wlasny": mojKomponent},
    template: `<wlasny/>`
})