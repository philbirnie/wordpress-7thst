const assembler = require('fabricator-assemble');
const browserSync = require('browser-sync');
const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const prefix = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const reload = browserSync.reload;
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const webpack = require('webpack');
const gulpStylelint = require('gulp-stylelint');


// configuration
const config = {
  dev: gutil.env.dev,
  ghostMode: gutil.env.ghostMode === true ? true : false,
  styles: {
    browsers: 'last 2 versions',
    fabricator: {
      src: 'src/assets/fabricator/styles/fabricator.scss',
      dest: 'dist/assets/fabricator/styles',
      watch: 'src/assets/fabricator/styles/**/*.scss',
    },
    toolkit: {
      src: 'src/assets/toolkit/styles/*.scss',
      dest: 'dist/assets/toolkit/styles',
      watch: 'src/assets/toolkit/styles/**/*.scss',
    },
    toolkitLint: {
      src: ['src/assets/toolkit/styles/**/*.scss', '!src/assets/toolkit/styles/generic/_normalize.scss'],
    },
  },
  scripts: {
    fabricator: {
      src: './src/assets/fabricator/scripts/fabricator.js',
      dest: 'dist/assets/fabricator/scripts',
      watch: 'src/assets/fabricator/scripts/**/*',
    },
    toolkit: {
      src: './src/assets/toolkit/scripts/toolkit.js',
      dest: 'dist/assets/toolkit/scripts',
      watch: 'src/assets/toolkit/scripts/**/*',
    },
  },
  images: {
    toolkit: {
      src: ['src/assets/toolkit/images/**/*', 'src/favicon.ico'],
      dest: 'dist/assets/toolkit/images',
      watch: 'src/assets/toolkit/images/**/*',
    },
  },
  sprites: {
    toolkit: {
      src: ['src/assets/toolkit/sprites/**/*.svg'],
      dest: 'dist/assets/toolkit/images',
      watch: 'src/assets/toolkit/sprites/**/*.svg',
    },
  },
  templates: {
    watch: 'src/**/*.{html,md,json,yml}',
  },
  dest: 'dist',
};


// clean
gulp.task('clean', del.bind(null, [config.dest]));


// styles
gulp.task('styles:fabricator', () => {
  gulp.src(config.styles.fabricator.src)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(prefix({
    remove: false
  }))
  .pipe(gulpif(!config.dev, csso()))
  .pipe(rename('f.css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.styles.fabricator.dest))
  .pipe(gulpif(config.dev, reload({ stream: true })));
});

gulp.task('styles:toolkit', ['lint-styles'], () => {
  gulp.src(config.styles.toolkit.src)
  .pipe(gulpif(config.dev, sourcemaps.init()))
  .pipe(sass({
    includePaths: './node_modules',
  }).on('error', sass.logError))
  .pipe(prefix('last 2 versions'))
  .pipe(gulpif(!config.dev, csso()))
  .pipe(gulpif(config.dev, sourcemaps.write()))
  .pipe(gulp.dest(config.styles.toolkit.dest))
  .pipe(gulpif(config.dev, reload({ stream: true })));
});

gulp.task('styles', ['styles:fabricator', 'styles:toolkit']);

// Stylelint
gulp.task('lint-styles', () => {
  return gulp
      .src(config.styles.toolkitLint.src)
      .pipe(gulpStylelint({
          reporters: [
              {
                  formatter: 'string',
                  console: true
              }
          ]
      }));
});


// scripts
const webpackConfig = require('./webpack.config')(config);

gulp.task('scripts', (done) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      gutil.log(gutil.colors.red(err()));
    }
    const result = stats.toJson();
    if (result.errors.length) {
      result.errors.forEach((error) => {
        gutil.log(gutil.colors.red(error));
      });
    }
    done();
  });
});


// images
gulp.task('images', ['favicon'], () => {
  return gulp.src(config.images.toolkit.src)
    .pipe(imagemin())
    .pipe(gulp.dest(config.images.toolkit.dest));
});

// Copy
gulp.task('copy', () => {
  return gulp.src(['src/data/**/*'])
	.pipe(gulp.dest(config.dest + '/assets/toolkit/data'));
});

// Sprites
gulp.task('sprites', () => {
  return gulp.src(config.sprites.toolkit.src)
        .pipe(svgmin({
          plugins: [{
            cleanupIDs: false
          }]
        }))
        .pipe(svgstore({
            inlineSvg: true,
        }))
        .pipe(gulp.dest(config.sprites.toolkit.dest));
});

// Favicon
gulp.task('favicon', () => {
  return gulp.src('src/favicon.ico')
  .pipe(gulp.dest(config.dest));
});


// assembler
gulp.task('assembler', (done) => {
  assembler({
    logErrors: config.dev,
    helpers: {
      setVariable: require('./helpers/setVariable.js'),
      ifEval: require('./helpers/ifEval'),
      forLoop: require('./helpers/forLoop'),
    },
    dest: config.dest,
  });
  done();
});


// server
gulp.task('serve', () => {

  browserSync({
    server: {
      baseDir: config.dest,
    },
    ghostMode: config.ghostMode,
    notify: false,
    logPrefix: 'FABRICATOR',
  });

  gulp.task('assembler:watch', ['assembler'], browserSync.reload);
  gulp.watch(config.templates.watch, ['assembler:watch']);

  gulp.task('styles:watch', ['styles']);
  gulp.watch([config.styles.fabricator.watch, config.styles.toolkit.watch], ['styles:watch']);

  gulp.task('scripts:watch', ['scripts'], browserSync.reload);
  gulp.watch([config.scripts.fabricator.watch, config.scripts.toolkit.watch], ['scripts:watch']);

  gulp.task('images:watch', ['images'], browserSync.reload);
  gulp.watch(config.images.toolkit.watch, ['images:watch']);

  gulp.task('copy:watch', ['copy'], browserSync.reload);
  gulp.watch(['src/data/**/*'], ['copy:watch']);

  gulp.task('sprites:watch', ['sprites'], browserSync.reload);
  gulp.watch(config.sprites.toolkit.watch, ['sprites:watch']);

});


// default build task
gulp.task('default', ['clean'], () => {

  // define build tasks
  const tasks = [
    'styles',
    'scripts',
    'sprites',
    'images',
    'copy',
    'assembler',
  ];

  // run build
  runSequence(tasks, () => {
    if (config.dev) {
      gulp.start('serve');
    }
  });

});
