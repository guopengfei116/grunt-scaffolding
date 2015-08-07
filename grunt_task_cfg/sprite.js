
var buildConfig = require('../lib/buildConfig')(gruntProject.src, 'img');

var spriteConfig = buildConfig.initBuildDir().build();

module.exports = spriteConfig;
