exports.cleanDir = [];

//调试模式下清除
if(gruntProject.debug) {
    exports.cleanDir.push(gruntProject.dest);
}

console.log('clean config initialized');
