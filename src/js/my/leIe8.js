var Sys = {};
var ua = navigator.userAgent.toLowerCase();
if (window.ActiveXObject){
    Sys.ie = ua.match(/msie ([\d.]+)/)[1]
    if (Sys.ie<=7){
        alert('你目前的IE版本为'+Sys.ie+'版本太低，请升级！');location.href="http://windows.microsoft.com/zh-CN/internet-explorer/downloads/ie";
    }
}