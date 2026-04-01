import gulp from "gulp";
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import browserSync from "browser-sync";

import * as esbuild from "esbuild";
import dartSass from 'sass';

import { join } from "path";
import { mkdirSync, copyFileSync, readdirSync } from "fs";

// --- Paths ---
const paths = {
  src: {
    js: "./src/js/asciiart.js",
    demoMain: "./src/demo/main.js",
    scss: "./src/scss/style.scss",
  },
  dist: {
    js: "./dist/js",
    css: "./dist/css",
    demo: "./demo",
  },
  demo:{
    js: "./demo/js",
    css: "./demo/css",
  }
};

const outfiles = {
    asciiart: {
        js: `${paths.dist.js}/asciiart.min.js`,
        esm: `${paths.dist.js}/asciiart.esm.min.js`
    },
    demo: `${paths.dist.demo}/bundle.js`
}

const demofiles = {
    asciiart: {
        js: `${paths.demo.js}/asciiart.min.js`,
        esm: `${paths.demo.js}/asciiart.esm.min.js`
    },
}

const sass = gulpSass(dartSass);
const bs = browserSync.create();


// --- JS Bundling ---
export const jsBundle = async () => {
  // IIFE (normal script)
  await esbuild.build({
    entryPoints: [paths.src.js],
    outfile: outfiles.asciiart.js,
    bundle: true,
    minify: true,
    sourcemap: true,
    format: "iife",
    globalName: "AsciiartTheme"
  });

  // ESM
  await esbuild.build({
    entryPoints: [paths.src.js],
    outfile: outfiles.asciiart.esm,
    bundle: true,
    minify: true,
    sourcemap: true,
    format: "esm",
  });

  // Demo bundle
  await esbuild.build({
    entryPoints: [paths.src.demoMain],
    bundle: true,
    outfile: outfiles.demo,
    format: "iife",
    sourcemap: true
  });
};


// --- Compile Sass ---
export const compileSass = () => {
  return gulp.src(paths.src.scss)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename('style.css')) // optional if you want to rename
    .pipe(gulp.dest(paths.dist.css));
};

// --- Copy CSS ---
export const copyCSS = (done) => {
  mkdirSync(paths.demo.css, { recursive: true });
  const files = readdirSync(paths.dist.css);
  for (const file of files) {
    copyFileSync(join(paths.dist.css, file), join(paths.demo.css, file));
  }
  done();
};

// --- Copy JS ---
export const copyJS = (done) => {
  mkdirSync(paths.demo.js, { recursive: true });
  copyFileSync(outfiles.asciiart.js, demofiles.asciiart.js);
  copyFileSync(outfiles.asciiart.esm, demofiles.asciiart.esm);
  done();
};



export const serve = (done) => {
  bs.init({
    server: {
      baseDir: "./demo"
    },
    open: true,
    notify: false
  });
  done();
};

export const reload = (done) => {
  bs.reload();
  done();
};


// --- Full Build ---
export const build = gulp.series(jsBundle,compileSass,gulp.parallel(copyJS, copyCSS));
export default build;

// Watch
export const watch = gulp.series(build, serve, function watchFiles() {

  gulp.watch(
    "src/scss/**/*.scss",
    gulp.series(compileSass, copyCSS, reload)
  );

  gulp.watch(
    "src/js/**/*.js",
    gulp.series(jsBundle, copyJS, reload)
  );

  gulp.watch(
    "./demo/*.html",
    reload
  );

});
