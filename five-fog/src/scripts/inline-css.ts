import fs from 'node:fs/promises'
import path from 'node:path'

const distPath = path.join(process.cwd(), 'dist')
const htmlPath = path.join(distPath, 'index.html')

const html = await fs.readFile(htmlPath, 'utf8')

const cssLinkMatch = html.match(
    /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/
)

if (!cssLinkMatch) {
    throw new Error('Could not find stylesheet link in index.html')
}

const cssHref = cssLinkMatch[1]
const cssPath = path.join(distPath, cssHref.replace(/^\//, ''))

const css = await fs.readFile(cssPath, 'utf8')

const nextHtml = html.replace(
    cssLinkMatch[0],
    `<style>${css}</style>`
)

await fs.writeFile(htmlPath, nextHtml, 'utf8')