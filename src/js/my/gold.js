/**
 * Created by Administrator on 2016/9/13.
 */

$(document).ready(function () {
    var ocontent=$("#gold .content");
    var oh=($(window).height()-ocontent.height())/2;
    ocontent.css("marginTop",oh);
    (genClips = function () {
        $t = $('#gold .content');
        var amount = 5;
        var width = $t.width() / amount;
        var height = $t.height() / amount;
        var totalSquares = Math.pow(amount, 2);
        var oSrc=$t.find("img:first").attr("src");
        var oSrcIndex=oSrc.lastIndexOf("/");
        var abSrc=oSrc.slice(0,oSrcIndex);
        var goldBox=$('#gold .clipped-box');
        var y = 0;
        var index = 1;
        for (var z = 0; z <= (amount * width); z = z + width) {
            if (z % 2 == 0) {
                $("<img class='clipped' src='"+abSrc+"/jb1.png'>").appendTo(goldBox);
            } else {
                $("<img class='clipped' src='"+abSrc+"/jb2.png'>").appendTo(goldBox);
            }

            if (z === (amount * width) - width) {
                y = y + height;
                z = -width;
            }
            if (index >= 5) {
                index = 1;
            }
            index++;
            if (y === (amount * height)) {
                z = 9999999;
            }
        }
    })();
    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function rand2(min, max) {
        return Math.random() * (max - min + 0.1) + min;
    }
    var animated = false;
    var gold_box =$("#gold"),
        clipped_box =gold_box.find('.clipped-box'),
        imgs = clipped_box.find('img'),
        close=gold_box.find(".close");
    close.on("click",function(){
        gold_box.animate({"width":"0",height:"0"},400,function(){
            $(this).hide(200);
        });
    });
    function dra(clearTime) {
        if (animated === false) {
            clipped_box.css({'display': 'block', "opacity": "1"});
            // Apply to each clipped-box div.
            imgs.each(function () {
                var v = rand(120, 90),
                    angle = rand(80, 89),
                    theta = (angle * Math.PI) / 180,
                    g = -9.8;

                // $(this) as self
                var self = $(this);
                var t = 0,
                    z, r, nx, ny,
                    totalt = 10;
                var negate = [1, -1, 0],
                    direction = negate[Math.floor(Math.random() * negate.length)];

                var randDeg = rand(-5, 10),
                    randScale = rand2(0.6, 0.9),
                    randDeg2 = rand(30, 5);

                // And apply those
                $(this).css({
                    'transform': 'scale(' + randScale + ') skew(' + randDeg + 'deg) rotateZ(' + randDeg2 + 'deg)'
                });

                // Set an interval
                z = setInterval(function () {
                    var ux = (Math.cos(theta) * v) * direction;
                    var uy = (Math.sin(theta) * v) - ((-g) * t);
                    nx = (ux * t);
                    ny = (uy * t) + (0.25 * (g) * Math.pow(t, 2));
                    if (ny < -40) {
                        ny = -40;
                    }
                    //$("#html").html("g:" + g + "bottom:" + ny + "left:" + nx + "direction:" + direction);
                    $(self).css({
                        'bottom': (ny) + 'px',
                        'left': (nx) + 400 + 'px'
                    });
                    // Increase the time by 0.10
                    t = t + 0.10;

                    //����ѭ��
                    if (t > totalt) {
                        clicked = false;
                        first = true;
                        clearInterval(z);
                    }
                }, 20);
            });
            animated = true;
        }
        setTimeout(function () {
            re()
        }, clearTime);
    }
    dra(3000);
    function re() {
        if (animated) {
            clipped_box.animate({"opacity": "0"}, 2000, function () {
                $(this).css({'display': 'none'});
                imgs.each(function () {
                    $(this).delay(2000).removeAttr("style");
                });
                animated = false;
            });
        }
    }
    setTimeout(function () {
        dra(5000);
    }, 7000)
});
