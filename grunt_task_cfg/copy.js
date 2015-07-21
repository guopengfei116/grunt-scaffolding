exports.common = {
    expand: true,
    flatten: false,
    cwd: gruntProject.src,
    src: ['*/js/*.js'],
    dest: gruntProject.dest
};

console.log('copy config initialized');