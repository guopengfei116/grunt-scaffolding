
exports.options = {
    livereload : '<% connect.options.livereload %>'
};
console.log(exports.options);
exports.livereload = {
    files : [
        '*/tpl/_index.html',
        '*/sass/index.css',
        '*/js/main.js'
    ]
};