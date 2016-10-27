$(document).ready(function () {
    initialize();
});

function initialize() {
    //
    includeHtml("content/header.html", "#header");
    //
    includeHtml("content/sidebar-content.html", "#sidebar-content");
    //
    includeHtml("content/footer.html", "#footer-container-main");
    //
    showLatestBlog();
}


function showLatestBlog() {
    var blogsObj = getJsonFromUrlSync("json/blogs.json");
    //
    var blogsArr = blogsObj.blogs;
    //
    var latestBlog = blogsArr[blogsArr.length-1];
    //
    var title = latestBlog.title;
    var content = latestBlog.content;
    var date = latestBlog.date;
    var author = latestBlog.author;
    var image = latestBlog.image;
    //
    addBlogEntry(title, content, date, author, image, "#content");
}

function addBlogEntry(title, content, date, author, image, appendTo) {
    //
    var blog =
            "<div class='blog-entry'>" +
            "<div class='blog-entry-title'>" + title + "</div>" +
            "<div class='blog-entry-img'>" + image + "</div>" +
            "<div class='blog-entry-content'>" + content + "</div>" +
            "<div class='blog-entry-foot'>" + date + "/" + author + "</div>" +
            "</div>";
    //
    $(appendTo).append(blog);
}

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