var LARGE = 1200;
var MEDIUM = 972; //Bootstrap 992
var SMALL = 768;
var X_SMALL = 460; // bootstrap 480
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





