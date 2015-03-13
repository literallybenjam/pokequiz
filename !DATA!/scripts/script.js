/* jslint asi:true, browser:true */

var stage;
var current_section = null;
var current_div = null;
var egg_group;
//  Size, clusion  //
var EGG_NAMES = ["Field", "Ditto", "Water 1", "Monster", "Grass", "Bug", "Mineral", "Dragon", "Flying", "Water 3", "Amorphous", "Water2", "Undiscovered", "Fairy", "Human-Like"];
var EGG_COORDS = [[1, 0], [1, 1], [0.6, 0], [0.6, 0.7], [0.45, 0.55], [0.45, 0.8], [0.45, 1], [0.3, 0], [0.3, 1], [0.2, 0.8], [0.2, 1], [0, 0.7]];
//  Activeness, act  //
var MONSTER_NAMES = ["Cocky", "Tough", "Giant", "Overpowering", "Normal", "Elegant", "Protective", "Ninja", "Lizard"];
var MONSTER_COORDS = [[0.5, 1], [0, 1], [0, 0.5], [1, 1], [0.5, 0.5], [0, 0], [1, 0], [0.5, 0], [1, 0.5]];

function calculateSectionValue(section_id) {
    var section_element = document.getElementById(section_id);
    var div_element = null;
    var i;
    var j;
    var cumulative_value = 0;
    for (i = 0; i < section_element.getElementsByTagName("DIV").length; i++) {
        div_element = section_element.getElementsByTagName("DIV").item(i);
        for (j = 0; j < div_element.getElementsByTagName("SPAN").length; j++) {
            if (div_element.getElementsByTagName("SPAN").item(j).dataset.selected !== undefined) {
                cumulative_value += j / (div_element.getElementsByTagName("SPAN").length - 1);
                break;
            }
        }
    }
    return cumulative_value / section_element.getElementsByTagName("DIV").length;
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function calculateEggGroup() {
    var size = calculateSectionValue("egg-size");
    var clusive = calculateSectionValue("egg-clusive");
    var best_guess = 0;
    var best_guess_distance = Math.SQRT2;
    var i;
    var c;
    var n = EGG_COORDS.length;
    for (i = 0; i < n; i++) {
        c = calculateDistance(EGG_COORDS[i][0], EGG_COORDS[i][1], size, clusive);
        if (c < best_guess_distance) {
            best_guess = i;
            best_guess_distance = c;
        }
    }
    egg_group = best_guess;
}

function displayResult(name) {
    window.location.assign("Result/" + name + "/");
}

function advanceDiv() {

    unloadDiv();
    do current_div = current_div.nextElementSibling;
    while (current_div && current_div.tagName !== "DIV");
    if (current_div) loadDiv();
    else {

        switch (current_section.id) {

            case "begin":
                loadSection("egg-size");
                break;

            case "egg-size":
                loadSection("egg-clusive");
                break;
            case "egg-clusive":
                calculateEggGroup();
                if (EGG_NAMES[egg_group] == "Ditto") loadSection("ditto-check");
                else if (EGG_NAMES[egg_group] == "Dragon") loadSection("dragon-check");
                else if (EGG_NAMES[egg_group] == "Flying") loadSection("flying-check");
                else loadEggGroup();
                break;

            case "ditto-check":
                if (calculateSectionValue("ditto-check") >= 0.5) {
                    displayResult("Ditto");
                    break;
                }
                egg_group = 12;
                loadEggGroup();
                break;

            case "dragon-check":
                if (calculateSectionValue("dragon-check") < 0.5) egg_group = 13;
                loadEggGroup();
                break;

            case "flying-check":
                if (calculateSectionValue("flying-check") < 0.5) egg_group = 14;
                loadEggGroup();
                break;

            default:
                break;

        }

    }

}

function selectOption() {
    this.dataset.selected = "";
    advanceDiv();
}

function unloadDiv() {
    var i;
    current_div.dataset.mode = "1";
    for (i = 0; i < current_div.getElementsByTagName("SPAN").length; i++) {
        current_div.getElementsByTagName("SPAN").item(i).removeEventListener("click", selectOption, false);
    }
}

function loadDiv() {
    var i;
    current_div.dataset.mode = "0";
    for (i = 0; i < current_div.getElementsByTagName("SPAN").length; i++) {
        current_div.getElementsByTagName("SPAN").item(i).addEventListener("click", selectOption, false);
    }
    current_div.scrollIntoView({block: "end", behavior: "smooth"});
}

function loadSection(section_id) {
    current_section = document.getElementById(section_id);
    current_section.dataset.show = "";
    current_div = current_section.getElementsByTagName("DIV").item(0);
    loadDiv();
}

function loadEggGroup() {

    switch(EGG_NAMES[egg_group]) {

        case "Monster":
            break;

        case "Water 1":
            break;

        case "Bug":
            break;

        case "Flying":
            break;

        case "Field":
            break;

        case "Fairy":
            break;

        case "Grass":
            break;

        case "Human-Like":
            break;

        case "Water 3":
            break;

        case "Mineral":
            break;

        case "Amorphous":
            break;

        case "Water 2":
            break;

        case "Dragon":
            break;

        case "Undiscovered":
            break;

        default:
            break;

    }

}

function init() {
    window.scroll({top: 0, behavior: "smooth"});
    loadSection("begin");
}

document.addEventListener("DOMContentLoaded", init, false);
