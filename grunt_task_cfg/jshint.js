exports.options = {
    boreser: true,
    node: true,
    camelcase: true,
    curly: true,
    eqnull: true,
    eqeqeq: true,
    undef: true,
    debug: gruntProject.debug || false,
    globals: {
        jQuery: true,
        underscore: true,
        console: true,
        module: true
    }
};

exports.hint = [gruntProject.src + '/UG/*.js'];
