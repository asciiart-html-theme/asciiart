// gulpfile.js
import gulp from "gulp";
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import * as esbuild from "esbuild";
import dartSass from 'sass';
import { join } from "path";
import { mkdirSync, copyFileSync, readdirSync } from "fs";

// --- Paths ---
const paths = {
  src: {
    js: "./src/js/asciiart.js",
    demoMain: "./src/demo/main.js",
    css: "./dist/css",
    scss: "./src/scss/style.scss",
  },
  dist: {
    js: "./dist/js",
    demo: "./demo",
    demoJS: "./demo/js",
    demoCSS: "./demo/css",
    cssDest: "./dist/css",
  }
};

const sass = gulpSass(dartSass);


// --- JS Bundling ---
export const jsBundle = async () => {
  // IIFE (normal script)
  await esbuild.build({
    entryPoints: [paths.src.js],
    outfile: `${paths.dist.js}/asciiart.min.js`,
    bundle: true,
    minify: true,
    sourcemap: true,
    format: "iife",
    globalName: "AsciiartTheme"
  });

  // ESM
  await esbuild.build({
    entryPoints: [paths.src.js],
    outfile: `${paths.dist.js}/asciiart.esm.min.js`,
    bundle: true,
    minify: true,
    sourcemap: true,
    format: "esm",
    globalName: "AsciiartTheme"
  });

  // Demo bundle
  await esbuild.build({
    entryPoints: [paths.src.demoMain],
    bundle: true,
    outfile: `${paths.dist.demo}/bundle.js`,
    format: "iife",
    sourcemap: true
  });
};

// --- Compile Sass ---
export const compileSass = () => {
  return gulp.src(paths.scss)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename('style.css')) // optional if you want to rename
    .pipe(gulp.dest(paths.cssDest));
};

// --- Copy CSS ---
export const copyCSS = (done) => {
  mkdirSync(paths.dist.demoCSS, { recursive: true });
  const files = readdirSync(paths.src.css);
  for (const file of files) {
    copyFileSync(join(paths.src.css, file), join(paths.dist.demoCSS, file));
  }
  done();
};

// --- Copy JS ---
export const copyJS = (done) => {
  mkdirSync(paths.dist.demoJS, { recursive: true });
  copyFileSync(`${paths.dist.js}/asciiart.min.js`, `${paths.dist.demoJS}/asciiart.min.js`);
  copyFileSync(`${paths.dist.js}/asciiart.esm.min.js`, `${paths.dist.demoJS}/asciiart.esm.min.js`);
  done();
};


// --- Full Build ---
export const build = gulp.series(jsBundle,compileSass,gulp.parallel(copyJS, copyCSS));
export default build;