/* jslint asi:true, browser:true */

var stage;
var current_section = null;
var current_div = null;
var egg_group;
var EGG_NAMES = ["field", "undiscovered", "water1", "monster", "grass", "bug", "mineral", "dragon", "flying", "water3", "amorphous", "water2", "ditto", "fairy", "humanlike"];
var EGG_COORDS = [[1, 0], [1, 1], [0.6, 0], [0.6, 0.7], [0.45, 0.55], [0.45, 0.8], [0.45, 1], [0.3, 0], [0.3, 1], [0.2, 0.8], [0.2, 1], [0, 0.7], [0, 0]];

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

function calculateEggGroup(with_ditto) {
    if (with_ditto === undefined) with_ditto = true;
    var size = calculateSectionValue("egg-size");
    var clusive = calculateSectionValue("egg-clusive");
    var best_guess = 0;
    var best_guess_distance = Math.SQRT2;
    var i;
    var c;
    var n = EGG_COORDS.length;
    if (!with_ditto) n--;
    for (i = 0; i < n; i++) {
        c = calculateDistance(EGG_COORDS[i][0], EGG_COORDS[i][1], size, clusive);
        if (c < best_guess_distance) {
            best_guess = i;
            best_guess_distance = c;
        }
    }
    egg_group = best_guess;
}

function advanceDiv() {

    unloadDiv();
    do current_div = current_div.nextElementSibling;
    while (current_div && current_div.tagName !== "DIV");
    if (current_div) loadDiv();
    else {

        switch (current_section.id) {

            case "egg-size":
                loadSection("egg-clusive");
                break;

            case "egg-clusive":
                calculateEggGroup();
                if (EGG_NAMES[egg_group] == "ditto") loadSection("ditto-check");
                //  else if (EGG_NAMES[egg_group] == "dragon") loadSection("dragon-check");
                //  else if (EGG_NAMES[egg_group] == "flying") loadSection("flying-check");
                break;

            case "ditto-check":
                if (calculateSectionValue("ditto-check") < 0.5) calculateEggGroup(false);
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
    current_div.scrollIntoView(false, {behaviour: "smooth"});
}

function loadSection(section_id) {
    current_section = document.getElementById(section_id);
    current_section.dataset.show = "";
    current_div = current_section.getElementsByTagName("DIV").item(0);
    loadDiv();
}

function init() {
    loadSection("egg-size");
}

document.addEventListener("DOMContentLoaded", init, false);
