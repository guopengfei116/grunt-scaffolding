exports.options = {
    style: gruntProject.status === 'deploy' ? 'compressed' : 'expanded',
    sourcemap: false,
    trace: false
};

exports.files = [
    {
        expand: true,
        cwd: gruntProject.src,
        src: ['*/sass/*.scss'],
        dest: gruntProject.dest,
        ext: '.css'
    }
];

console.log('sass config initialized');