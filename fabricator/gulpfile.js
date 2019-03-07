const fabAssemble = require('fabricator-assemble');
const browserSync = require('browser-sync');
const concatFilenames = require('gulp-concat-filenames');
const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const argv = require('minimist')(process.argv.slice(2));
const log = require('fancy-log');
const imagemin = require('gulp-imagemin');
const prefix = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const stylelint = require('gulp-stylelint');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const webpack = require('webpack');
const browsers = require('./package.json');
sass.compiler = require('node-sass');

const server = browserSync.create();

function reload(done) {
  if (server) server.reload();
  done();
}

// configuration
const config = {
  dev: !!argv.dev,
  styles: {
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
      src: [
        'src/assets/toolkit/styles/**/*.scss',
        '!src/assets/toolkit/styles/generic/_normalize.scss',
      ],
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
    fabricator: {
      src: ['src/assets/toolkit/sprites/**/*.svg'],
      dest: 'src/materials/components',
    },
    toolkit: {
      src: ['src/assets/toolkit/sprites/**/*.svg'],
      dest: 'dist/assets/toolkit/images',
      watch: 'src/assets/toolkit/sprites/**/*.svg',
    },
  },
  copy: {
    toolkit: {
      src: 'src/data/**/*.json',
      dest: 'dist/assets/toolkit/data',
      watch: 'src/data/**/*.json',
    },
  },
  fonts: {
    toolkit: {
      src: 'src/assets/toolkit/fonts/**/*',
      dest: 'dist/assets/toolkit/fonts',
    },
  },
  templates: {
    watch: 'src/**/*.{html,md,json,yml}',
  },
  dest: 'dist',
};

// clean
const clean = () => del([config.dest]);

// styles
function stylesFabricator() {
  return gulp
    .src(config.styles.fabricator.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      prefix({
        browsers: browsers.browserslist,
      })
    )
    .pipe(gulpif(!config.dev, csso()))
    .pipe(rename('f.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.styles.fabricator.dest))
    .pipe(server.stream());
}

function stylesToolkit() {
  return gulp
    .src(config.styles.toolkit.src)
    .pipe(gulpif(config.dev, sourcemaps.init()))
    .pipe(
      sass({
        includePaths: './node_modules',
      }).on('error', sass.logError)
    )
    .pipe(prefix(config.styles.browsers))
    .pipe(gulpif(!config.dev, csso()))
    .pipe(gulpif(config.dev, sourcemaps.write()))
    .pipe(gulp.dest(config.styles.toolkit.dest))
    .pipe(server.stream());
}

// Stylelint
function lintStyles() {
  return gulp.src(config.styles.toolkitLint.src).pipe(
    stylelint({
      reporters: [
        {
          formatter: 'string',
          console: true,
        },
      ],
    })
  );
}

const styles = gulp.series(stylesFabricator, lintStyles, stylesToolkit);

// scripts
const webpackConfig = require('./webpack.config')(config);

function scripts(done) {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      log.error(err());
    }
    const result = stats.toJson();
    if (result.errors.length) {
      result.errors.forEach(error => {
        log.error(error);
      });
    }
    done();
  });
}

// images
function imgFavicon() {
  return gulp.src('src/favicon.ico').pipe(gulp.dest(config.dest));
}

function imgMinification() {
  return gulp
    .src(config.images.toolkit.src)
    .pipe(imagemin())
    .pipe(gulp.dest(config.images.toolkit.dest));
}
const images = gulp.series(imgFavicon, imgMinification);

// sprites
function buildSprites() {
  return gulp
    .src(config.sprites.toolkit.src)
    .pipe(
      svgstore({
        inlineSvg: true,
        parserOptions: { xmlMode: true },
      })
    )
    .pipe(
      svgmin({
        plugins: [
          {
            cleanupIDs: false,
            removeViewBox: false,
          },
        ],
      })
    )
    .pipe(gulp.dest(config.sprites.toolkit.dest));
}

// Returns file name without path or extension
function getFileName(filePath) {
  const fileName = filePath
    .replace(/^.*[\\\/]/, '')
    .split('.')
    .shift();

  return fileName;
}

// Sprite template
function fileNameFormatter(filepath) {
  const fileName = getFileName(filepath);
  const html = `<svg class="c-icon" pointer-events="none">
    <title>${fileName}</title>
    <use xlink:href="#${fileName}"></use>
  </svg>`;
  return html;
}

function spritesToFabricator() {
  return gulp
    .src(config.sprites.toolkit.src)
    .pipe(
      concatFilenames('icons.html', {
        template: fileNameFormatter,
      })
    )
    .pipe(gulp.dest(config.sprites.fabricator.dest));
}

const sprites = gulp.series(buildSprites, spritesToFabricator);

// copy
function copy() {
  return gulp
    .src(config.copy.toolkit.src)
    .pipe(gulp.dest(config.copy.toolkit.dest));
}

// fonts
function fonts() {
  // Fonts
  return gulp
    .src(config.fonts.toolkit.src)
    .pipe(gulp.dest(config.fonts.toolkit.dest));
}

// assembly
function assembler(done) {
  fabAssemble({
    logErrors: config.dev,
    dest: config.dest,
    helpers: {
      // {{ default description "string of content used if description var is undefined" }}
      default: function defaultFn(...args) {
        return args.find(value => !!value);
      },
      // {{ concat str1 "string 2" }}
      concat: function concat(...args) {
        return args.slice(0, args.length - 1).join('');
      },
      // {{> (dynamicPartial name) }} ---- name = 'nameOfComponent'
      dynamicPartial: function dynamicPartial(name) {
        return name;
      },
      eq: function eq(v1, v2) {
        return v1 === v2;
      },
      ne: function ne(v1, v2) {
        return v1 !== v2;
      },
      and: function and(v1, v2) {
        return v1 && v2;
      },
      or: function or(v1, v2) {
        return v1 || v2;
      },
      not: function not(v1) {
        return !v1;
      },
      gte: function gte(a, b) {
        return +a >= +b;
      },
      lte: function lte(a, b) {
        return +a <= +b;
      },
      plus: function plus(a, b) {
        return +a + +b;
      },
      minus: function minus(a, b) {
        return +a - +b;
      },
      divide: function divide(a, b) {
        return +a / +b;
      },
      multiply: function multiply(a, b) {
        return +a * +b;
      },
      abs: function abs(a) {
        return Math.abs(a);
      },
      mod: function mod(a, b) {
        return +a % +b;
      },
      setVariable: require('./helpers/setVariable.js'),
      ifEval: require('./helpers/ifEval'),
      forLoop: require('./helpers/forLoop'),
    },
  });
  done();
}

// server
function serve(done) {
  server.init({
    server: {
      baseDir: config.dest,
    },
    notify: false,
    logPrefix: 'FABRICATOR',
  });
  done();
}

function watch() {
  gulp.watch(
    config.templates.watch,
    { interval: 500 },
    gulp.series(assembler, reload)
  );
  gulp.watch(
    [config.scripts.fabricator.watch, config.scripts.toolkit.watch],
    { interval: 500 },
    gulp.series(scripts, reload)
  );
  gulp.watch(
    config.images.toolkit.watch,
    { interval: 500 },
    gulp.series(images, reload)
  );
  gulp.watch(
    config.copy.toolkit.watch,
    { interval: 500 },
    gulp.series(copy, reload)
  );
  gulp.watch(
    config.sprites.toolkit.watch,
    { interval: 500 },
    gulp.series(sprites, reload)
  );
  gulp.watch(
    [config.styles.fabricator.watch, config.styles.toolkit.watch],
    { interval: 250 },
    gulp.series(styles)
  );
}

// default build task
let tasks = [clean, styles, scripts, images, sprites, copy, fonts, assembler];
if (config.dev) tasks = tasks.concat([serve, watch]);
gulp.task('default', gulp.series(tasks));
