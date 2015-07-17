exports.options = {
    optimizationLevel : 7
};

exports.UG = {
    files: [{
        expand: true,
        cwd: gruntProject.src,
        src: '**/*.{png,jpg,gif}',
        dest: gruntProject.dest
    }]
};