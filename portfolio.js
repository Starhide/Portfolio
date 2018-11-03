var template = "<div class=\"col-md-4\"><div class=\"project-tile\"><img src=\"\" alt=\"\" class=\"project-image\"><div class=\"tile-text\"><h2></h2><p></p></div></div></div>";

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
    }
}


function displayProjects() {
    printSlowText("#Projects .console-inside", 25, "> print(links.Projects.description)", 0, function (e) {
        $(e)[0].innerHTML += "<br />A collection of everything I've worked on. School projects, experiments, applications, etc. Some are finished, many are work-in-progress, and a few are abandoned.<br />";
        setTimeout(printSlowText, 500, "#Projects .console-inside", 25, "> displayProjects();", 0, function (e) {
            textProgressBar(e, 4000 / projects.length, 20, 0, projects.length, $(e)[0].innerHTML);
            var i = 0;
            for (const project of projects) {
                var element =
                    `<div class=\"col-md-4\"><div class=\"project-tile\"><img src=\"${project.image}\" alt=\"\" class=\"project-image\">
                     <div class=\"tile-text\">
                     <h2>${project.title}</h2>
                     <p>${project.description}</p>
                     Tags: ${project.tags}</div></div></div>`;
                $("#TileBoard > .row").append(element);
                $($("#TileBoard .project-tile")[i]).delay(4000 / projects.length * (i+1)).fadeIn(1000);
                i = i + 1;
            }
        });
    });



}

displayProjects();