import { access, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const declarations = await readFile(join(root, 'node_modules/omverse-ui/dist/index.d.ts'), 'utf8')
const coverage = JSON.parse(await readFile(join(root, 'lib/component-coverage.json'), 'utf8'))
const exportBlock = declarations.match(/export \{([^}]+)\};\s*$/s)?.[1]

if (!exportBlock) throw new Error('Could not find the omverse-ui public export block.')

const publicComponents = exportBlock
  .split(',')
  .map((entry) => entry.trim())
  .filter((entry) => !entry.startsWith('type '))
  .filter((entry) => /^[A-Z]/.test(entry))

const documented = new Map()

for (const [route, exports] of Object.entries(coverage)) {
  const pagePath = join(root, 'app', route, 'page.tsx')
  await access(pagePath)
  const source = await readFile(pagePath, 'utf8')

  for (const component of exports) {
    if (!source.includes(component)) {
      throw new Error(`${component} is assigned to ${route}, but is not referenced by ${pagePath}.`)
    }
    documented.set(component, route)
  }
}

const missing = publicComponents.filter((component) => !documented.has(component))
if (missing.length) throw new Error(`Undocumented public components: ${missing.join(', ')}`)

console.log(`Documentation coverage: ${publicComponents.length}/${publicComponents.length} public components across ${Object.keys(coverage).length} pages.`)
