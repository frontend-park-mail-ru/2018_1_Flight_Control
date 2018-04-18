const pug = require("pug");
const fs = require("fs");

const PATH = "../data/js/components/";

function compileTmpl(path, fileName, functionName, jsName)
{
	let fullPath = PATH + path;
	let templateFunc = pug.compileFileClient(fullPath + fileName, {name: functionName});
	fs.writeFileSync(fullPath + jsName, templateFunc);
}

compileTmpl("Scoreboard/paginator/", "paginator.tmpl.pug", "generatePaginator", "paginator.tmpl.js");
compileTmpl("Scoreboard/scoreboard/", "scoreboard.tmpl.pug", "generateScoreboard", "scoreboard.tmpl.js");

