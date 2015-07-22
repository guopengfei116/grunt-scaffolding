exports.options = {
    optimizationLevel : 7
};

exports.UG = {
    files: [{
        expand: true,
        cwd: gruntProject.src,
        src: '*/img/*.{png,jpg,gif}',
        dest: gruntProject.dest
    }]
};

console.log('imagemin config initialized');