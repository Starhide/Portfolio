var template = "<div class=\"col-md-4\"><div class=\"project-tile\"><img src=\"\" alt=\"\" class=\"project-image\"><div class=\"tile-text\"><h2></h2><p></p></div></div></div>";
var projectLoadSpeed = 3000;


function printSlowText(element, speed, txt, pos, finish) {
    if (pos < txt.length) {
        $(element)[0].innerHTML += txt.charAt(pos);
        pos++;
        setTimeout(printSlowText, speed, element, speed, txt, pos, finish);
    } else {
        if (finish) {
            finish(element);
        }
    }
}

function textProgressBar(e, speed, length, i, max, prev) {
    if (i <= max) {
        $(e)[0].innerHTML = prev + "<pre>[" + "=".repeat(Math.floor((i / max) * length)) + " ".repeat(length - Math.floor((i / max) * length)) + "] " + i + "/" + max + "</pre>";
        i++;
        setTimeout(textProgressBar, speed, e, speed, length, i, max, prev);
    } else {
        $(e)[0].innerHTML += " > ";
    }
}


function displayProjects() {
    var i = 0;
    for (const project of projects) {
        var element =
            `<div class=\"col-md-4\"><div class=\"project-tile\"><img src=\"${project.image}\" alt=\"\" class=\"project-image\">
                     <div class=\"tile-text\">
                     <h2><a href="${project.link}">${project.title}</a></h2>
                     <p>${project.description}</p>
                     Tags: ${project.tags}</div></div></div>`;
        $("#TileBoard > .row").append(element);
        $($("#TileBoard .project-tile")[i]).delay(projectLoadSpeed / projects.length * (i + 1)).fadeIn(1000);
        i = i + 1;
    }
}

areProjectsDisplayed = false;

function toggleProjects(){
    if(areProjectsDisplayed){
        areProjectsDisplayed = false;
        hideProjects();
    } else {        
        areProjectsDisplayed = true;
        showProjects();
    }
}

function loadProjects(){
    for (const project of projects) {
        var element =
            `<div class=\"col-md-4\"><div class=\"project-tile\"><img src=\"${project.image}\" alt=\"\" class=\"project-image\">
                     <div class=\"tile-text\">
                     <h2><a href="${project.link}">${project.title}</a></h2>
                     <p>${project.description}</p>
                     Tags: ${project.tags}</div></div></div>`;
                     
        $("#TileBoard > .row").append(element);
    }
}

function showProjects() {
    $("#TileBoard .project-tile").fadeIn();
}

function hideProjects() {
    $("#TileBoard .project-tile").fadeOut();
}

function consoleSlide(selector){
    arrow = $(selector + " i")[0];
    if(arrow.className.includes("left")){
        arrow.className = "arrow down";
    }
    else{
        arrow.className = "arrow left";
    }
    $(selector + " div.console-inside").slideToggle();
}

$(document).ready(function () {
    loadProjects()
});
