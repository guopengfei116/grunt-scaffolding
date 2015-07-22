var fs = require('fs');

exports.import = {
    options: {
        replacements: [
            {
                pattern: /<!-- @import (.+) -->/ig,
                replacement: function (match, $1) {
                    return grunt.file.read(gruntProject.src + $1);
                }
            }
        ]
    },
    files: [
        {
            expand: true,
            cwd: gruntProject.src,
            src: '*/tpl/*.html',
            dest: gruntProject.dest
        }
    ]
};

console.log('string-replace config initialized');