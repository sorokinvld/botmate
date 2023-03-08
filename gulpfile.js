const gulp = require('gulp');
const { series } = require('gulp');
const run = require('gulp-run');

function clean(cb) {
  // body omitted
  cb();
}

async function build(cb) {
  run('npm run build').exec();

  gulp.src('apps/web/out/**/*').pipe(gulp.dest('apps/server/dist/client'));

  // process.chdir('apps/server/dist');

  cb();
}

exports.build = build;
exports.default = series(clean, build);
