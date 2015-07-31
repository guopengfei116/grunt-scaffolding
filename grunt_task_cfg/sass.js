
/**
 * 开发模式生产结构化代码，
 * 部署模式生产混淆压缩代码
 * */
exports.options = {
    style: gruntProject.debug ? 'expanded' : 'compressed',
    sourcemap: false,
    trace: false
};

/**
 * 编译scss到开发目录
 * */
exports.files = [
    {
        expand: true,
        cwd: gruntProject.src,
        src: ['*/sass/*.scss'],
        dest: gruntProject.prd,
        ext: '.css'
    }
];

console.log('sass config initialized');