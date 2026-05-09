import {mkdir, writeFile} from 'node:fs/promises'
import path from 'node:path'

const API_URL = 'https://pokeapi.co/api/v2/pokemon'
const OUT_FILE = path.resolve('../five-fog/src/index/master.json')
const LIMIT = 100_000

async function main() {
    const response = await fetch(
        `${API_URL}?limit=${LIMIT}&offset=0`,
    )

    if (!response.ok) {
        throw new Error(
            `Request failed: ${response.status} ${response.statusText}`,
        )
    }

    const data = await response.json()

    await mkdir(path.dirname(OUT_FILE), {recursive: true})

    await writeFile(
        OUT_FILE,
        JSON.stringify(data.results, null, 2),
    )

    console.log(`Saved ${data.results.length} Pokémon to ${OUT_FILE}`)
}

main().catch(error => {
    console.error(error)
    process.exit(1)
})