import fs from 'node:fs/promises'
import path from 'node:path'
import {createServer} from 'vite'
import {fileURLToPath} from 'node:url'
import POKEMON_INDEX from '../index/master.json'
import {Pokemon} from '../lib/types'
import {getPokemon} from '../lib/api'
import {HelmetServerState} from 'react-helmet-async'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distPath = path.join(__dirname, '../..', 'dist')
const BUILD_TIME = new Date().toISOString()

type SitemapEntry = {
    url: string
    lastmod?: string
    changefreq?: 'daily' | 'weekly' | 'monthly'
    priority?: number
}

const sitemap = new Map<string, SitemapEntry>()

const extractHeadTags = (html: string) => {
    const tags: string[] = []

    const stripped = html.replace(
        /<(title|meta|link)\b[^>]*>.*?<\/\1>|<(meta|link)\b[^>]*\/?>/gis,
        (match) => {
            tags.push(match)
            return ''
        }
    )

    return {
        head: tags.join('\n'),
        body: stripped,
    }
}

const makeViewPages = async (
    data: Pokemon[],
    render: (arg0: string, arg1: unknown) => { html: string, helmet: HelmetServerState },
    template: string
) => {
    for (const pokemon of data) {
        const _in = {
            pokemon,
            name: pokemon.name,
            error: undefined,
            loading: false
        }

        const {html: inner} = render(`/pokemon/${_in.name}`, _in)
        const {head, body} = extractHeadTags(inner)

        const html = template
            .replace('</head>', `${head}\n</head>`)
            .replace('<div id="root"></div>', `<div id="root">${body}</div>`)

        const outFile = path.join(distPath, 'pokemon', _in.name, 'index.html')
        await fs.mkdir(path.dirname(outFile), {recursive: true})
        await fs.writeFile(outFile, html)

        const url = encodeURI(`/pokemon/${_in.name}`)
        sitemap.set(url, {
            url,
            lastmod: BUILD_TIME,
            changefreq: 'weekly',
            priority: 0.8,
        })

        console.log(`Wrote ${url}`)
    }
}

const BASE_URL = 'https://five-fog.bryantjames.com'

const escapeXml = (s: string) =>
    s
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll('\'', '&apos;')

const buildSitemapXml = (
    entries: SitemapEntry[]
) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
    .map(
        ({url, lastmod, changefreq, priority}) => `  <url>
    <loc>${escapeXml(`${BASE_URL}${url}`)}</loc>
    ${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ''}
    ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}
    ${priority != null ? `<priority>${priority.toFixed(1)}</priority>` : ''}
  </url>`
    )
    .join('\n')}
</urlset>
`

const writeSitemap = async () => {
    const entries = [...sitemap.values()].sort((a, b) =>
        a.url.localeCompare(b.url)
    )

    const outFile = path.join(distPath, 'sitemap.xml')
    await fs.writeFile(outFile, buildSitemapXml(entries), 'utf8')
}

const main = async () => {
    const vite = await createServer({
        server: {middlewareMode: true},
        appType: 'custom',
    })

    const template = await fs.readFile(path.join(distPath, 'index.html'), 'utf-8')
    const {render} = await vite.ssrLoadModule('/src/scripts/build-entry.tsx')

    for (const {name} of POKEMON_INDEX) {
        console.log(`Grabbing ${name}`)
        const pokemon = await getPokemon(name)
        pokemon && (await makeViewPages([pokemon], render, template))
    }

    await vite.close()
    await writeSitemap()
}

await main()
