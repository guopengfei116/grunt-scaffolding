var fs = require('fs');
var path = require('path');
var util = require('./lib/util');
var TASK_MODULES_PATH = 'node_modules';

module.exports = function (grunt) {
    var pkgCfg, projectCfg, taskCfgs, taskModuleNames, initCfg = {}, isDeploy = false;

    //项目根路径（根据grunt规范，主进程在项目根路径）
    var CWD = process.cwd();
    var er = new Error('需要一个正确的grunt对象');

    //grunt对象验证
    if(!grunt && !grunt.version) {
        throw er;
    }

    //项目规范检查
    if(!fs.existsSync(path.join(CWD + '/Gruntfile.js')) || !fs.existsSync(path.join(CWD + '/package.json'))) {
        grunt.fail.warn('非规范的grunt项目', 2);
    }

    global.grunt = grunt;

    //获取grunt-package配置
    pkgCfg = grunt.file.readJSON('package.json');

    //是否部署代码
    isDeploy = grunt.option('deploy') || false;

    //添加全局变量
    util.initGlobalConstant(pkgCfg, isDeploy);

    //获取工程结构配置
    projectCfg = pkgCfg.projectCfg || {};

    //获取所有grunt—task配置
    taskCfgs = util.getChildrenFiles(projectCfg.taskCfgPath);

    //获取grunt-task模块名
    taskModuleNames = util.getTaskModuleName(TASK_MODULES_PATH);

    initCfg.pkg = pkgCfg;

    //构建grunt配置
    taskCfgs.forEach(function (val) {

        //获取task模块的grunt配置名
        var taskCfgName = path.basename(val, '.js');

        //构建匹配task模块名的正则
        var taskReg = new RegExp('^grunt-(' + taskCfgName + '|' + 'contrib-' + taskCfgName + ')$');

        //配置构建
        initCfg[taskCfgName] = require(val);

        //遍历task模块
        taskModuleNames.forEach(function (val) {

            //加载已配置的task模块
            taskReg.test(val) && grunt.loadNpmTasks(val);
            taskReg.test(val) && grunt.log.ok(val + ' task loaded');
        });
    });

    //初始化grunt配置
    grunt.initConfig(initCfg);

    /**
     *  注册默认任务(任务调用简写方式)，根据参数调用相关的构建模式任务，默认调用其构建模式的调试模式，。
     *  运行 grunt 命令调用 'production-debug' 任务，
     *  运行 grunt --deply 调用 'deploy-debug' 任务。
     * */
    grunt.registerTask('default', function () {
        if(isDeploy) {
            grunt.log.write('####部署环境代码调试####');
            grunt.task.run('deploy-debug');
        }else {
            grunt.log.ok('====开发环境代码调试====');
            grunt.task.run('production-debug');
        }
    });

    /*
    *  开发模式任务，通过运行 grunt production 命令调用。构建流程：
    *  1、清除调试代码目录
    *  2、合并js --> 调试目录
    *  3、构建html --> 调试目录
    *  4、解析sass --> 调试目录
    *  5、合成雪碧图 --> 调试目录
    *  6、剩余未操作文件复制 --> 调试目录
    * */
    grunt.registerTask('production', ['clean', 'concat', 'string-replace', 'sass', 'copy']);

    /**
     * 开发模式调试任务，通过运行 grunt 或 grunt production-debug 命令调用。构建流程：
     * 1、使用开发模式任务
     * 2、开启静态文件服务器 --> 调试目录
     * 3、开启文件监听 --> 调试目录
     * */
    grunt.registerTask('production-debug', ['production', 'connect']);

    /*
    *  部署模式任务，通过grunt deploy 命令调用。构建流程：
    *  1、使用开发模式任务
    *  2、混淆压缩js --> 部署目录
    *  3、混淆压缩css --> 部署目录(默认关闭状态，因为如果全部使用scss编写，则已经被压缩)
    *  4、压缩图片 --> 部署目录
    *  5、剩余未操作文件复制 --> 部署目录
    *  6、通过gzip算法对部署目录的html、js、css文件进行二次压缩 --> 部署目录(默认关闭状态)
    * */
    grunt.registerTask('deploy', ['production', 'uglify', 'compress', 'connect']);

    /**
     * 开发模式调试任务，通过运行 grunt --deploy 或 grunt deploy-debug 命令调用。构建流程：
     * 1、使用部署模式任务
     * 2、开启静态文件服务器 --> 部署目录
     * 3、开启文件监听 --> 部署目录
     * */
    grunt.registerTask('deploy-debug', ['deploy', 'connect']);
};