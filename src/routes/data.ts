import { readdir } from 'fs/promises'

let cache: {
	body: string[]
}

export const GET = async () => {
	if (cache) return cache

	const meme = await readdir(`static/meme`)

	cache = {
		body: meme
			.filter((meme) => meme !== '.DS_Store')
			.map((meme) => encodeURI(meme))
	}

	return cache
}
