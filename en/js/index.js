var i=0;//翻屏变量，初始第一屏
var s = 0; //该变量作用是鼠标滑轮一直向下或者向上滑动时出现抖动现象

$(function() {

    var starttime = 0,
        endtime = 0;
    $("body").mousewheel(function (event, delta) {

        starttime = new Date().getTime(); //记录翻屏的初始时间

        if (delta < 0 && i >= 0 && i <= 2) {

            if (s >= 0 && (starttime == 0 || (endtime - starttime) <= -500)) { //在500ms内执行一次翻屏
                s = 1;
                i++;
                renderPage(i, true);  //翻屏函数
                endtime = new Date().getTime(); //记录翻屏的结束时间
            }
        } else if (delta > 0 && i >= 1 && s == 1 && (starttime == 0 || (endtime - starttime) <= -500)) {
            i--;
            //console.log(i);
            renderPage(i, true);
            endtime = new Date().getTime();
        }

    });

    var div_height = $(window).height();

    $(".div_01,.div_02,.div_03,.div_04").css({'height': div_height});

    $(window).resize(function () {

        var div_height = $(window).height();

        $(".div_01,.div_02,.div_03,.div_04").css({'height': div_height});

    });

    function renderPage(pageNumber, isScroll) {
        if (isScroll) {
            $('body, html').animate({scrollTop: pageNumber * div_height}, 'slow');
            $(".left_fixed ul li").removeClass("active");
            $(".left_fixed ul li").eq(pageNumber).addClass("active");
        }

        return;
    }

    $(".left_fixed ul li").on("click", function () { //点击小导航也执行翻屏
        var index = $(this).index();
        renderPage(index, true);
        $(".left_fixed ul li").removeClass("active");
        $(this).addClass("active");
        return false;
    });
})