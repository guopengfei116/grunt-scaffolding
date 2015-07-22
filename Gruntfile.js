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

    //构建grunt配置
    initCfg.pkg = pkgCfg;

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

    grunt.registerTask('default', function () {
        if(isDeploy) {
            grunt.log.write('####部署环境代码####');
            grunt.task.run('deploy');
        }else {
            grunt.log.ok('====开发环境代码====');
            grunt.task.run('production');
        }
    });

    grunt.registerTask('production', ['copy', 'concat', 'string-replace']);
    grunt.registerTask('deploy', ['copy', 'concat', 'uglify', 'string-replace']);
};