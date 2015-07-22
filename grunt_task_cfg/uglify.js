/*
* 部署模式压缩全部文件
* */
if(!gruntProject.debug) {
    exports.options = {
        mangle: {
            except: ['jQuery', 'CXG']
        }
    };
    exports.deploy = {
        expand: true,
        cwd: gruntProject.dest,
        src: ['**/*.js'],
        dest: gruntProject.dest
    };
/*
* 开发模式自定义
* */
}else {
    exports.navegaki = {
        expand: true,
        cwd: gruntProject.dest,
        src: ['common/js/*.js'],
        dest: gruntProject.dest
    };
}

console.log('uglify config initialized');
