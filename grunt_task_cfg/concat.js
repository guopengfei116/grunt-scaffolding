exports.options = {
    separator: ''
};

exports.UG = {
    src: [gruntProject.src + '/UG/**/*.js'],
    dest: gruntProject.dest + '/UG/js/index.js'
};

exports.son = {
    src: gruntProject.src + '/UG/js/son/*.js',
    dest: gruntProject.dest + '/UG/js/son/son.js'
};