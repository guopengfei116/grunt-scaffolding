
var buildConfig = require('../lib/buildConfig')(gruntProject.src, 'img');

var spriteConfig = buildConfig.initBuildDir().build();

console.log(spriteConfig);
module.exports = spriteConfig;
