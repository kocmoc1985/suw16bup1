var LARGE = 1200;
var MEDIUM = 992;
var SMALL = 768;
var X_SMALL = 480;
//
$(document).ready(function () {
    //
    var width = $(window).width();
    //
    if (width < MEDIUM) {
        $(".sidebar-menu").removeClass("hide");
        $(".sidebar-menu").addClass("show");
    }
    //
    if (width > MEDIUM) {
        $(".sidebar-menu").removeClass("show");
        $(".sidebar-menu").addClass("hide");
    }
});
//
$(window).on('resize orientationChange', function (event) {
    //
    var width = $(window).width();
    //
    if (width < MEDIUM) {
        $(".sidebar-menu").removeClass("hide");
        $(".sidebar-menu").addClass("show");
    }
    //
    if (width > MEDIUM) {
        $(".sidebar-menu").removeClass("show");
        $(".sidebar-menu").addClass("hide");
    }
});
//
//
//
$(window).load(function () {
    //Hide links in mobile mode after clicking on a link
    $(".sidebar-entry").mouseup(function () {
        //
        var width = $(window).width();
        //
        if (width < MEDIUM) {
            $(".sidebar-entry").fadeOut(500);
        }
        //
    });
});



