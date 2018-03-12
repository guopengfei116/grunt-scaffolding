
/*
 * 只有在部署模式下才会压缩img文件
 * */
if(!gruntProject.debug) {
    exports.options = {
        optimizationLevel : 7
    };
    exports.deploy = {
        files: [{
            expand: true,
            //cwd: gruntProject.prd,
            // 直接对源代码中的图片压缩即可，省的出现debug目录的只读权限
            cwd: gruntProject.src,
            src: ['*/img/**/*.{png,jpg,gif}'],
            dest: gruntProject.dest
        }]
    };
}


console.log('imagemin config initialized');