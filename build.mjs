import * as esbuild from 'esbuild'

async function buildFile(entry, outfile, format, globalName) {
  return esbuild.build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    minify: true,
    sourcemap: true,
    format,
    ...(globalName ? { globalName } : {})
  })
}

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
