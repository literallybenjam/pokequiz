/* jslint asi:true, browser:true */

var stage = 0;
var current_section = null;
var current_div = null;

function advanceDiv() {

    unloadDiv();
    current_div = current_div.nextElementSibling;
    if (current_div) loadDiv();
    else {

        switch (stage) {

            case 0:
                loadSection("egg-clusive");
                break;

            default:
                break;

        }
        stage++;

    }

}

function selectOption() {
    this.dataset.selected = "";
    advanceDiv();
}

function unloadDiv() {
    var i;
    current_div.dataset.mode = "1";
    for (i = 0; i < current_div.getElementsByTagName("span"); i++) {
        current_div.getElementsByTagName("span").item(i).removeEventListener("click", selectOption, false);
    }
}

function loadDiv() {
    var i;
    current_div.dataset.mode = "0";
    for (i = 0; i < current_div.getElementsByTagName("span"); i++) {
        current_div.getElementsByTagName("span").item(i).addEventListener("click", selectOption, false);
    }
}

function loadSection(id) {
    current_section = document.getElementById(id);
    current_div = current_section.children.item(0);
}

function init() {
    loadSection("egg-size");
}

window.addEventListener("DOMContentLoaded", init, false);
