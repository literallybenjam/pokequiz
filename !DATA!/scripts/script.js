/* jslint asi:true, browser:true */

var stage = 0;
var current_section = null;
var current_div = null;

function advanceDiv() {

    unloadDiv();
    do current_div = current_div.nextElementSibling;
    while (current_div && current_div.tagName !== "DIV");
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
    current_section.dataset.show = "";
    current_div = current_section.getElementsByTagName("div").item(0);
}

function init() {
    loadSection("egg-size");
}

document.addEventListener("DOMContentLoaded", init, false);
