import * as esbuild from 'esbuild'
import { copyFileSync, mkdirSync } from 'fs';

await esbuild.build({
    entryPoints: ['./src/js/asciiart.js'],
    outfile:'./dist/js/asciiart.min.js',
    bundle: true,
    minify: true,
    sourcemap: true,
    format:'iife',
    globalName: 'AsciiartTheme'
})

await esbuild.build({
    entryPoints: ['./src/js/asciiart.js'],
    outfile:'./dist/js/asciiart.esm.min.js',
    bundle: true,
    minify: true,
    sourcemap: true,
    format:'esm',
    globalName: 'AsciiartTheme'
})

await esbuild.build({
  entryPoints: ['./dist/dempo/main.js'],
  bundle: true,
  outfile: './demo/bundle.js',
  format: 'iife',
  sourcemap: true
});

// Ensure target dir exists
mkdirSync('./demo/js', { recursive: true });

// Copy files
copyFileSync('./dist/js/asciiart.esm.min.js', './demo/js/asciiart.esm.min.js');
copyFileSync('./dist/js/asciiart.min.js', './demo/js/asciiart.min.js');

mkdirSync('./demo/css', { recursive: true });
copyFileSync('./dist/css/*', './demo/css/');