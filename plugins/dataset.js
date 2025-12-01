import path from 'node:path'
import fs from 'fs-extra'
import yaml from 'yaml'

const ROOT = path.resolve(__dirname, '..')

const DATA_DIR = path.join(ROOT, 'data')

const rltData = {}

const files = fs.readdirSync(DATA_DIR).filter(x => x.endsWith('.yml'))

// console.log(files);

for (const file of files) {
  const content = fs.readFileSync(path.join(DATA_DIR, file)).toString()
  const fileNoExt = file.replace('.yml', '')
  try {
    const parsed = yaml.parse(content)
    rltData[fileNoExt.trim('.yml')] = parsed
  }
  catch (e) {
    console.warn(`Site config ${file} is invalid: ${e.message}`)
  }
}

// console.log(rltData)

const script = `export default ${JSON.stringify(rltData)}`

export default function datasetPlugin() {
  const virtualFileId = 'virtual:dataset'

  return {
    name: 'dataset',
    resolveId(id) {
      if (id === virtualFileId)
        return virtualFileId
    },
    load(id) {
      if (id === virtualFileId)
        return script
    },
  }
}
