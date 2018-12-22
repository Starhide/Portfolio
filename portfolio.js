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

function showProjects() {
    $("#Projects .console-inside")[0].innerHTML = "";
    $("#Projects").delay(1000).slideDown();
    setTimeout(displayProjects, 1000);
}

function hideProjects() {
    $("#TileBoard .project-tile").fadeOut();

    setTimeout(function () {
        $("#TileBoard > .row").empty();
    }, 1000);

    $("#Projects").delay(700).slideUp();
}

function showAbout() {
    $("#About").delay(1400).slideDown();
}

function hideAbout() {
    $("#About").slideUp();
}

$(document).ready(function () {
    displayProjects()
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);
        if (hash.toLowerCase() == "about") {
            $("#About").show();
        } else if (hash.toLowerCase() == "projects") {
            $("#Projects").show();
            displayProjects();
        }
    } else {
        $("#About").show();
    }
});
