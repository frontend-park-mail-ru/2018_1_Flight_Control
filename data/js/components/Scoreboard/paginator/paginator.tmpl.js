function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function generatePaginator(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (count, page, step) {;pug_debug_line = 1;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
var paginatorName = 'paginator-link';
var leftArrowClass = 'scoreboard__paginator-left';
var rightArrowClass = 'scoreboard__paginator-right';
var linkClass = 'scoreboard__paginator-link';


;pug_debug_line = 8;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
if ((page > 1)) {
;pug_debug_line = 9;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("class", pug_classes([leftArrowClass], [true]), false, false)+" href=\"\""+pug_attr("name", paginatorName, true, false)+pug_attr("value", page - 1, true, false)) + "\u003E";
;pug_debug_line = 9;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = '<') ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
;pug_debug_line = 12;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
switch (page){
case 1:
;pug_debug_line = 14;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
var i = 1;
;pug_debug_line = 15;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
var tailpage = 1;
;pug_debug_line = 16;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
var points = '';
;pug_debug_line = 17;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
if ((1 + step < count)) {
;pug_debug_line = 18;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
tailpage = step + 1;
;pug_debug_line = 19;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
points = '...';
}
else {
;pug_debug_line = 21;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
tailpage = count - 1;
}
;pug_debug_line = 22;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
while (i <= tailpage) {
;pug_debug_line = 23;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("class", pug_classes([linkClass], [true]), false, false)+" href=\"\""+pug_attr("name", paginatorName, true, false)) + "\u003E";
;pug_debug_line = 23;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = i++) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
;pug_debug_line = 24;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + "\u003Ci\u003E";
;pug_debug_line = 24;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = points) ? "" : pug_interp)) + "\u003C\u002Fi\u003E";
;pug_debug_line = 25;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("class", pug_classes([linkClass], [true]), false, false)+" href=\"\""+pug_attr("name", paginatorName, true, false)) + "\u003E";
;pug_debug_line = 25;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = count) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
  break;
case count:
;pug_debug_line = 28;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
var headpage = 1;
;pug_debug_line = 29;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
if ((1 + step < count)) {
;pug_debug_line = 30;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
headpage = count - step;
;pug_debug_line = 31;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("class", pug_classes([linkClass], [true]), false, false)+" href=\"\""+pug_attr("name", paginatorName, true, false)) + "\u003E";
;pug_debug_line = 31;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = 1) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
;pug_debug_line = 32;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + "...";
}
else {
;pug_debug_line = 34;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
headpage = 1;
}
;pug_debug_line = 35;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
while (headpage <= count) {
;pug_debug_line = 36;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("class", pug_classes([linkClass], [true]), false, false)+" href=\"\""+pug_attr("name", paginatorName, true, false)) + "\u003E";
;pug_debug_line = 36;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = headpage++) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
  break;
default:
;pug_debug_line = 39;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
if ((page - 1 > step)) {
;pug_debug_line = 40;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("class", pug_classes([linkClass], [true]), false, false)+" href=\"\""+pug_attr("name", paginatorName, true, false)) + "\u003E";
;pug_debug_line = 40;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = 1) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
;pug_debug_line = 41;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + "...";
;pug_debug_line = 42;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
var i = page - step;
;pug_debug_line = 43;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
while (i <= page) {
;pug_debug_line = 44;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("class", pug_classes([linkClass], [true]), false, false)+" href=\"\""+pug_attr("name", paginatorName, true, false)) + "\u003E";
;pug_debug_line = 44;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = i++) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
}
else {
;pug_debug_line = 46;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
var i = 1;
;pug_debug_line = 47;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
while (i <= page) {
;pug_debug_line = 48;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("class", pug_classes([linkClass], [true]), false, false)+" href=\"\""+pug_attr("name", paginatorName, true, false)) + "\u003E";
;pug_debug_line = 48;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = i++) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
}
;pug_debug_line = 50;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
if ((count - page > step)) {
;pug_debug_line = 51;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
var i = page + 1;
;pug_debug_line = 52;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
while (i <= page + step) {
;pug_debug_line = 53;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("class", pug_classes([linkClass], [true]), false, false)+" href=\"\""+pug_attr("name", paginatorName, true, false)) + "\u003E";
;pug_debug_line = 53;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = i++) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
;pug_debug_line = 54;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + "...";
;pug_debug_line = 55;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("class", pug_classes([linkClass], [true]), false, false)+" href=\"\""+pug_attr("name", paginatorName, true, false)) + "\u003E";
;pug_debug_line = 55;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = count) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
else {
;pug_debug_line = 57;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
var i = page + 1;
;pug_debug_line = 58;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
while (i <= count) {
;pug_debug_line = 59;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("class", pug_classes([linkClass], [true]), false, false)+" href=\"\""+pug_attr("name", paginatorName, true, false)) + "\u003E";
;pug_debug_line = 59;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = i++) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
}
  break;
}
;pug_debug_line = 62;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
if ((page < count)) {
;pug_debug_line = 63;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("class", pug_classes([rightArrowClass], [true]), false, false)+" href=\"\""+pug_attr("name", paginatorName, true, false)+pug_attr("value", page + 1, true, false)) + "\u003E";
;pug_debug_line = 63;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fpaginator\u002Fpaginator.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = '>') ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}}.call(this,"count" in locals_for_with?locals_for_with.count:typeof count!=="undefined"?count:undefined,"page" in locals_for_with?locals_for_with.page:typeof page!=="undefined"?page:undefined,"step" in locals_for_with?locals_for_with.step:typeof step!=="undefined"?step:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}