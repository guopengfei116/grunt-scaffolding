var path = require ("path");
var util = require ('./util');

/*
*  key代表支持的文件类型，value代表合并后文件的后缀名
* */
var typeMap = {
    img : {
        expression : '/*.{png,jpg,gif}',
        postfix : 'png'
    },
    js : {
        expression : '/*.js',
        postfix : '.js'
    },
    css : {
        expression : '/*.css',
        postfix : '.css'
    }
};

/*
*  构建grunt合并文件类型的任务配置
*
*  约定：工程目录结构采用如下方式组织
*  总工程 》 [子项目，子项目...] 》[img，js，tpl，sass，css等目录区分文件类型] 》[file，dir(待合并的文件)]
*
*  @param dir      项目根路径
*  @param type     文件类型名
* */
var BuildConfig = function (root, type) {
    this._root = root;
    this._type = type;
};

BuildConfig.prototype = {

    //返回一个符合预定的目录列表
    getBuildDir : function () {
        var i, j, projects, project, classify, items, buildList;

        //获取所有项目路径
        var projects = util.getChildrenFiles(this._root);

        //遍历项目
        for(i = projects.length - 1; i >= 0; i--) {
            project = projects[i];
            if(util.isDir(project)) {

                //找到项目下特定类型的文件夹
                classify = path.join(project, this._type);

                //获取某类型文件夹的子文件
                items = util.getChildrenFiles(classify);

                //遍历子文件，如果子文件是一个目录，则是一个符合约定的目录，并作记录
                for(j = items.length - 1; j >= 0; j--) {
                    util.isDir(items[j]) && buildList.push(items[j]);
                }
            }
        }

        return buildList;
    },

    //返回一个构建好的配置
    build : function (buildList) {

        if(!buildList || !buildList.length) {
            throw error('错误的build数据');
        }

        var baseName, destPath, config = {}, separator = path.sep;

        /*
        *  new一个正则，用以匹配构建目录的path
        * */
        var pattern = new RegExp(gruntProject.src.split(separator).join('\\' + separator));

        for (var i = buildList.length - 1; i >= 0; i--) {
            baseName = path.basename(buildList[i]);
            destPath = buildList[i].replace(pattern, gruntProject.prd);

            //构建配置
            config[baseName + i] = {
                src: path.join(buildList[i], typeMap[this.type]['expression']),
                dest: destPath + typeMap[this.type]['postfix']
            };
        }

        return config;
    }
};