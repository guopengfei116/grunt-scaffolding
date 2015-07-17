/*
* 部署模式压缩全部文件
* */
if(!gruntProject.debug) {
    exports.options = {
        mangle: true
    };
    exports.deploy = {
        expand: true,
        cwd: gruntProject.dest,
        src: ['/UG/**/*.js'],
        dest: gruntProject.dest
    };
/*
* 开发模式自定义
* */
}else {
    exports.navegaki = {
        expand: true,
        cwd: gruntProject.dest,
        src: ['navegaki/js/**.js'],
        dest: gruntProject.dest
    };
}
console.log(gruntProject.dest);
console.log(222);
