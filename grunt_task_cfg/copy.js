
/**
 * 调试模式，copy未操作文件到开发目录
 * */
if(gruntProject.debug) {
    exports.common = {
        expand: true,
        flatten: false,
        cwd: gruntProject.src,
        src: ['*/js/*.js', '*/css/*.css', '*/img/*'],
        dest: gruntProject.prd,
        filter: 'isFile'
    };
/**
 *  部署模式，copy不需要二次操作的文件到部署目录
 * */
}else {
    exports.common = {
        expand: true,
        flatten: false,
        cwd: gruntProject.prd,
        src: ['*/tpl/*.html', '*/img/*','!*/img/*.{png,jpg,jpeg}'],
        dest: gruntProject.dest
    };
}

console.log('copy config initialized');