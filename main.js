(function(){

var background_page = chrome.extension.getBackgroundPage(); 
var current_tab;
var Const = {
    inputElementId: "indfddfkkdgfhkhbhcafankkehlpnlao",
    html: "html", orgMode: "org_mode"
};

function init(){
    chrome.tabs.getSelected(null, function(tab){
        current_tab = tab;
    });
    $("#org-mode").click(function(){
        copyToClipboard(tagBuilder(current_tab, Const.orgMode));
        window.close();
    });
    $("#html").click(function(){
        copyToClipboard(tagBuilder(current_tab, Const.html));
        window.close();
    });
}

function copyToClipboard(str) {
    //console.log(str);
    //console.log(background_page);
    var obj = background_page.document.getElementById(Const.inputElementId);
    if (obj) {
        obj.value = str;
        obj.select();
        background_page.document.execCommand("copy", false, null);
    }
}

function tagBuilder(tab, type){
    var tag;
	if(type == Const.html){
        tag = "<a href=\"" + tab.url + "\">" + tab.title + "</a>"; 
    } else if (type == Const.orgMode){
        tag = "[[" + tab.url + "][" + tab.title + "]]";
    } 
    return tag;
}

$(function(){
  init();
});

})();
