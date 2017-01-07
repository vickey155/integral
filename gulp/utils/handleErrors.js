
var notify = require('gulp-notify');

module.exports = function () {
   var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title:"complie error <%=error.plugin%>",
        message:"<%=error.message%>"
    }).apply(this,args); //替换为当前对象

    this.emit('end');//提交

}