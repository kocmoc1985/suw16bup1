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
    var sidebarEntry =
            "<div class='sidebar-entry round-corners-med'>" +
            "<div class='index'>" + blogIndex + "</div>" +
            title +
            "</div>";
    //
    $(appendTo).append(sidebarEntry);
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
    var imgHtml;
    //
    if (image.length > 0) {
        imgHtml = "<div class='blog-entry-img'>" + "<img src='" + image + "'>" + "</div>";
    } else {
        imgHtml = "";
    }
    //
    var blog =
            "<div class='blog-entry round-corners-med'>" +
            "<div class='blog-entry-title'>" + title + "</div>" +
            imgHtml +
            "<div class='blog-entry-content'>" + content + "</div>" +
            "<div class='blog-entry-foot'>" + date + " / " + author + "</div>" +
            "</div>";
    //
    $(appendTo).append(blog);
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


(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id))
            return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/sv_SE/all.js#xfbml=1";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));