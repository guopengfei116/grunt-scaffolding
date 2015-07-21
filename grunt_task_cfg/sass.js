exports.options = {
    style: gruntProject.status === 'deploy' ? 'compressed' : 'expanded',
    sourcemap: false,
    trace: false
};

console.log('sass config initialized');