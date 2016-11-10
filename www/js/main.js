//==============================================================================
//==============================================================================

$(document).ready(function () {
    initialize();
});

var JSON_FILE_PATH = "json/blogs.json";

//==============================================================================
//==============================================================================

function initialize() {
    //
    includeHtml("content/header.html", "#header");
    //
    includeHtml("content/sidebar-content.html", "#sidebar-content");
    //
    includeHtml("content/footer.html", "#footer-container-main");
    //
    loadTemplates();
    //
    showSidebarEntries();
    //
    addEventsToSidebarEntries();
    //
    showBlog(-1);//show latest blog
    //
    addEventToSideBarMenuBtn();
}

//==============================================================================
//==============================================================================
//
var SIDE_BAR_ENTRY;
var BLOG_ENTRY;
//
function loadTemplates() {
    SIDE_BAR_ENTRY = loadHtml("content/sideBarEntry.html");
    BLOG_ENTRY = loadHtml("content/blogEntry.html");
}

function addEventToSideBarMenuBtn() {
    //
    $(".sidebar-menu").click(function () {
        if ($(".sidebar-entry").is(':visible')) {
            $(".sidebar-entry").fadeOut(500);
        } else {
            $(".sidebar-entry").fadeIn(500);
        }
    });
}

function addEventsToSidebarEntries() {
    //
    $(".sidebar-entry").click(function () {
        var index = getBlogIndex($(this));
        showBlog(index);
        //
        if (isScrolledIntoView("#blog-entry-title") === false && isVisible(".sidebar-menu") === false) { //
            $('html, body').animate({
                scrollTop: $("#blog-entry-title").offset().top - 20
            }, 1000);
        }
        //
    });
    //
}

function getBlogIndex(elem) {
    //
    var children = elem.children();
    //
    for (var i = 0; i < children.length; i++) {
        if (children[i].className === "index") {
            return index = $(children[i]).text();
        }
    }
    return -1;
}

function showSidebarEntries() {
    //
    var blogsObj = getJsonFromUrlSync(JSON_FILE_PATH);
    //
    var blogsArr = blogsObj.blogs;
    //
    for (var i = blogsArr.length - 1; i >= 0; i--) {
        var blogCurr = blogsArr[i];
        var title = blogCurr.title;
        addSidebarEntry(i, title, "#sidebar");
    }
}

function addSidebarEntry(blogIndex, title, appendTo) {
    //
    var templateObj = $(SIDE_BAR_ENTRY);
    //
    $(templateObj).find(".text").text(title);
    //
    $(templateObj).find(".index").text(blogIndex);
    //
    $(appendTo).append(templateObj);
}

//==============================================================================
//==============================================================================


function showBlog(index) {
    var index_;
    //
    var blogsObj = getJsonFromUrlSync(JSON_FILE_PATH);
    //
    var blogsArr = blogsObj.blogs;
    //
    if (index === -1) {
        index_ = blogsArr.length - 1;
    } else {
        index_ = index;
    }
    //
    var blogToShow = blogsArr[index_];
    //
    var title = blogToShow.title;
    var content = blogToShow.content;
    var date = blogToShow.date;
    var author = blogToShow.author;
    var image = blogToShow.image;
    //
    $("#content").empty();
    //
    addBlogEntry(title, content, date, author, image, "#content");
    //
}

function addBlogEntry(title, content, date, author, image, appendTo) {
    //
    var template = $(BLOG_ENTRY);
    //
    $(template).find(".blog-entry-title").text(title);
    //
    if (image.length > 0) {
        $(template).find(".blog-entry-img img").attr("src", image);
    } else {
        $(template).find(".blog-entry-img").remove();
    }
    //
    $(template).find(".blog-entry-content").text(content);
    //
    $(template).find(".blog-entry-foot").text(date + " / " + author);
    //
    $(appendTo).append(template);
    //
    //
    $(".blog-entry").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 1000);
}


//==============================================================================
//==============================================================================

function getJsonFromUrlSync(url) {
    //
    var jsonStr = $.ajax({
        url: url,
        dataType: 'json',
        async: false
    }).responseText;
    //
    return JSON.parse(jsonStr);
}

function includeHtml(url, selector, addType) {
    //
    var html = $.ajax({
        url: url,
        dataType: 'text',
        async: false
    }).responseText;
    //
    if (addType === "append") {
        $(selector).append(html);
    } else if (addType === "prepend") {
        $(selector).prepend(html);
    } else if (addType === "after") {
        $(selector).after(html);
    } else if (addType === "before") {
        $(selector).before(html);
    } else {
        $(selector).append(html);
    }
}

function includeHtmlAsync(url, selector, addType) {
    $.ajax({
        url: url,
        dataType: 'text',
        async: false
    }).done(function (msg) {
        if (addType === "append") {
            $(selector).append(msg);
        } else if (addType === "prepend") {
            $(selector).prepend(msg);
        } else if (addType === "after") {
            $(selector).after(msg);
        } else if (addType === "before") {
            $(selector).before(msg);
        } else {
            $(selector).append(msg);
        }
    });
}

function loadHtml(url) {
    //
    var html = $.ajax({
        url: url,
        type: "GET",
        dataType: 'html',
        async: false
    }).responseText;
    //
    return html;
}

//==============================================================================
//==============================================================================

function isScrolledIntoView(selector) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(selector).offset().top;
    var elemBottom = elemTop + $(selector).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function isVisible(selector) {
    return $(selector).is(':visible');
}

// facebook like button
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/sv_SE/all.js#xfbml=1";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));