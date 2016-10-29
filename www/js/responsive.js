var LARGE = 1200;
var MEDIUM = 972; //Bootstrap 992
var SMALL = 768;
var X_SMALL = 460; // bootstrap 480
//
$(document).ready(function () {
    //
    var width = $(window).width();
    //
    if (width <= X_SMALL) {
        $(".blog-entry img").addClass("image-xs-max-width");
    }
    //
    if (width < MEDIUM) {
        //
        $(".sidebar-menu").removeClass("hide");
        $(".sidebar-menu").addClass("show");
        //
        $(".sidebar-entry").addClass("sidebar-entry-mobile-view");
    }
    //
    if (width > MEDIUM) {
        //
        $(".sidebar-menu").removeClass("show");
        $(".sidebar-menu").addClass("hide");
        //
        $(".sidebar-entry").removeClass("sidebar-entry-mobile-view");
    }
    //
});
//
$(window).on('resize orientationChange', function (event) {
    //
    var width = $(window).width();
    //
    if (width < MEDIUM) {
        $(".sidebar-menu").removeClass("hide");
        $(".sidebar-menu").addClass("show");
        //
        $(".sidebar-entry").addClass("sidebar-entry-mobile-view");
    }
    //
    if (width > MEDIUM) {
        $(".sidebar-menu").removeClass("show");
        $(".sidebar-menu").addClass("hide");
        //
        $(".sidebar-entry").removeClass("sidebar-entry-mobile-view");
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





