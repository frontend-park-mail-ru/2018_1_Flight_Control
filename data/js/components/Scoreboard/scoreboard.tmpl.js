function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function generateScoreboard(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (data) {;pug_debug_line = 1;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctable class=\"scoreboard__table\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Cthead\u003E";
;pug_debug_line = 3;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 3;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = '№') ? "" : pug_interp)) + "\u003C\u002Fth\u003E";
;pug_debug_line = 4;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 4;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = 'Аватар') ? "" : pug_interp)) + "\u003C\u002Fth\u003E";
;pug_debug_line = 5;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 5;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = 'Email') ? "" : pug_interp)) + "\u003C\u002Fth\u003E";
;pug_debug_line = 6;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 6;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = 'Имя') ? "" : pug_interp)) + "\u003C\u002Fth\u003E";
;pug_debug_line = 7;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 7;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = 'Счет') ? "" : pug_interp)) + "\u003C\u002Fth\u003E";
;pug_debug_line = 8;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 8;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = 'Победы') ? "" : pug_interp)) + "\u003C\u002Fth\u003E";
;pug_debug_line = 9;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 9;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = 'Рейтинг') ? "" : pug_interp)) + "\u003C\u002Fth\u003E\u003C\u002Fthead\u003E";
;pug_debug_line = 10;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctbody\u003E";
;pug_debug_line = 11;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
// iterate data.leaders
;(function(){
  var $$obj = data.leaders;
  if ('number' == typeof $$obj.length) {
      for (var indexOfLeaders = 0, $$l = $$obj.length; indexOfLeaders < $$l; indexOfLeaders++) {
        var value = $$obj[indexOfLeaders];
;pug_debug_line = 12;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctr class=\"scoreboard__row\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 13;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = value.id + 1) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 14;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
if (value.avatar) {
;pug_debug_line = 15;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 16;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Cimg" + (pug_attr("src", value.avatar, true, false)+" width=\"100\" height=\"auto\"") + "\u002F\u003E\u003C\u002Ftd\u003E";
}
else {
;pug_debug_line = 18;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 19;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Cimg src=\"\u002Fimg\u002Favatar.png\" width=\"100\" height=\"auto\"\u002F\u003E\u003C\u002Ftd\u003E";
}
;pug_debug_line = 20;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 20;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = value.email) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 21;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 21;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = value.name) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 22;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 22;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = value.rate) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 23;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 23;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = value.rate) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 24;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 25;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
for (var index = 0; index < value.rate; index++)
;pug_debug_line = 26;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ci class=\"fas fa-star\"\u003E\u003C\u002Fi\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
      }
  } else {
    var $$l = 0;
    for (var indexOfLeaders in $$obj) {
      $$l++;
      var value = $$obj[indexOfLeaders];
;pug_debug_line = 12;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctr class=\"scoreboard__row\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 13;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = value.id + 1) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 14;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
if (value.avatar) {
;pug_debug_line = 15;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 16;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Cimg" + (pug_attr("src", value.avatar, true, false)+" width=\"100\" height=\"auto\"") + "\u002F\u003E\u003C\u002Ftd\u003E";
}
else {
;pug_debug_line = 18;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 19;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Cimg src=\"\u002Fimg\u002Favatar.png\" width=\"100\" height=\"auto\"\u002F\u003E\u003C\u002Ftd\u003E";
}
;pug_debug_line = 20;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 20;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = value.email) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 21;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 21;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = value.name) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 22;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 22;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = value.rate) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 23;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 23;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = value.rate) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 24;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 25;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
for (var index = 0; index < value.rate; index++)
;pug_debug_line = 26;pug_debug_filename = "data\u002Fjs\u002Fcomponents\u002FScoreboard\u002Fscoreboard.tmpl.pug";
pug_html = pug_html + "\u003Ci class=\"fas fa-star\"\u003E\u003C\u002Fi\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E";}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}