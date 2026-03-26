import * as esbuild from 'esbuild'
import { readdir } from 'fs/promises'
import path from 'path'

async function buildFile(entry, outfile, format, globalName) {
  return esbuild.build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    minify: true,
    format,
    ...(globalName ? { globalName } : {})
  })
}

// Main library builds
await Promise.all([
  buildFile('./src/js/asciiart.js', './dist/js/asciiart.min.js', 'iife'),
  buildFile('./src/js/asciiart.js', './dist/js/asciiart.esm.min.js', 'esm')
]).catch(() => process.exit(1))


// Components
const componentsDir = './src/js/components'
const files = await readdir(componentsDir)

await Promise.all(
  files
    .filter(file => file.endsWith('.js'))
    .flatMap(file => {
      const name = path.basename(file, '.js')
      const entry = `${componentsDir}/${file}`
      const globalName = name.charAt(0).toUpperCase() + name.slice(1)

      return [
        // IIFE build
        buildFile(
          entry,
          `./dist/js/components/${name}.min.js`,
          'iife',
          globalName
        ),

        // ESM build
        buildFile(
          entry,
          `./dist/js/components/${name}.esm.min.js`,
          'esm'
        )
      ]
    })
).catch(() => process.exit(1))