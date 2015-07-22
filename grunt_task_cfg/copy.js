exports.common = {
    expand: true,
    flatten: false,
    cwd: gruntProject.src,
    src: ['*/js/*.js'],
    dest: gruntProject.dest
};

exports.common = {
    expand: true,
    flatten: false,
    cwd: gruntProject.src,
    src: ['*/css/*.css'],
    dest: gruntProject.dest
};

console.log('copy config initialized');