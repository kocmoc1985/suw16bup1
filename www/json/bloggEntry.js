var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var formatYYY_mm_dd = "#year-#month-#day";
var formatDD_mm_YYYY = "#day/#month/#year";

function getDateFlex(format) {
    var d = new Date();
    return format.replace("#year", d.getFullYear()).replace("#month", months[d.getMonth()]).replace("#day", d.getDate());
}

//==============================================================================

function Blogs() {
    this.blogs = [];

    this.addBlog = function (blog) {
        this.blogs.push(blog);
    };
}

function Blog(title, content, date, author, image) {
    this.title = title;
    this.content = content;
    this.date = date;
    this.author = author;
    this.image = image;
}

var blogs = new Blogs();

var title = "Hej på dej";
var content = "";
var date = getDateFlex(formatYYY_mm_dd);
var author = "";
var image = "";
//
var blog1 = new Blog(title, content, date, author, image);
//
blogs.addBlog(blog1);


var jsonStr = JSON.stringify(blogs);

console.log(jsonStr);






