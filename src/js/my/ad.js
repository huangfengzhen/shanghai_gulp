/**
 * Created by Administrator on 2016/9/13.
 */

$(document).ready(function () {
    $("#ad .close").click(function(){
        $("#ad").animate({
            "width":0,
            "left":"1950px",
            "opacity":"0"
        },2500);
        return false;
    })
});