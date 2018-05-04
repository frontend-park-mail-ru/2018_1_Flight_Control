const fs = require('fs');
/**
 * Template generator with own syntax
 */
const pug = require('pug');

/**
 * @type {string} folder contains template source and output rendering function
 */
const PATH = '../data/js/components/';

/**
 * Compiles template and write it at the path param
 * @param {String} path Path for io
 * @param {String} fileName Source filename at the path
 * @param {String} functionName Callback name for template rendering
 * @param {String} jsName Output filename
 */
function compileTmpl(path, fileName, functionName, jsName) {
    let fullPath = PATH + path;
    let templateFunc = pug.compileFileClient(
        fullPath + fileName, {name: functionName});
    fs.writeFileSync(fullPath + jsName, templateFunc);
}

/**
 * Paginator template rendering
 */
compileTmpl(
    'Scoreboard/paginator/',
    'paginator.tmpl.pug',
    'generatePaginator',
    'paginator.tmpl.js'
);
/**
 * Scoreboard template rendering
 */
compileTmpl(
    'Scoreboard/',
    'scoreboard.tmpl.pug',
    'generateScoreboard',
    'scoreboard.tmpl.js'
);

