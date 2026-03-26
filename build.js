import * as esbuild from 'esbuild'
import { readdir } from 'fs/promises'
import path from 'path'

// Bundle main asciiart.js into a single file for traditional script usage
await esbuild.build({
  entryPoints: ['./src/js/asciiart.js'],
  outfile: './dist/js/asciiart.min.js',
  bundle: true,       // resolves imports
  minify: true,       // minify output
  format: 'iife',     // works in traditional <script>
  globalName: 'AsciiArt' // exposes your exports globally
}).catch(() => process.exit(1));

const componentsDir = './src/js/components'
const files = await readdir(componentsDir)

await Promise.all(
  files
    .filter(file => file.endsWith('.js'))
    .map(file => {
      const name = path.basename(file, '.js')

      return esbuild.build({
        entryPoints: [`${componentsDir}/${file}`],
        outfile: `./dist/js/components/${name}.min.js`,
        bundle: true,
        minify: true,
        format: 'iife',
        globalName: name.charAt(0).toUpperCase() + name.slice(1)
      })
    })
).catch(() => process.exit(1))