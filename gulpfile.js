const fs = require('fs');
const gulp = require('gulp');
const { series } = require('gulp');
const run = require('gulp-run');

const rootPackage = require('./package.json');
const serverPackage = require('./apps/server/package.json');

function clean(cb) {
  fs.mkdirSync('temp', { recursive: true });
  cb();
}

async function moveFiles(cb) {
  gulp.src('./apps/server/dist/**/*').pipe(gulp.dest('./temp'));
  gulp.src('./apps/web/out/**/*').pipe(gulp.dest('./temp/client'));

  const newPackage = {
    name: rootPackage.name,
    version: rootPackage.version,
    description: rootPackage.description,
    dependencies: {
      ...serverPackage.dependencies,
    },
    main: 'main.js',
    bin: {
      botmate: 'botmate.js',
    },
  };

  fs.writeFileSync(
    './temp/package.json',
    JSON.stringify(newPackage, null, 2),
    'utf8',
  );

  fs.writeFileSync(
    './temp/package.json',
    JSON.stringify(newPackage, null, 2),
    'utf8',
  );

  cb();
}

exports.default = series(clean, moveFiles);
