<script context="module" lang="ts">
	import type { LoadEvent } from '@sveltejs/kit'

	/** @type {import('./__types/[slug]').Load} */
	export const load = async ({ fetch }: LoadEvent) => {
		const meme = await fetch('/data').then((r) => r.json())

		return {
			props: {
				meme
			}
		}
	}
</script>

<script lang="ts">
	import { Image, Search } from '../libs/components'

	import '../styles/init.css'

	export let meme: string[]
	let init = meme.map((meme) => decodeURI(meme))

	let result = init

	const handleSearch = ({ detail }: CustomEvent<string[]>) => {
		result = detail
	}

	const randomMeme = () => init[Math.floor(Math.random() * meme.length + 1)]
</script>

<svelte:head>
	<title>SaltyAom's meme gallery</title>
	<meta name="theme-color" content="#fbfdfc" />

	<meta name="title" content="SaltyAom's meme gallery" />
	<meta
		name="description"
		content="Searchable meme gallery from SaltyAom's collection"
	/>
	<meta name="author" content="SaltyAom" />
	<link rel="canonical" href="https://meme.saltyaom.com" />

	<meta property="og:title" content="SaltyAom's meme gallery" />
	<meta
		property="og:description"
		content="Searchable meme gallery from SaltyAom's collection"
	/>
	<meta property="article:author" content="SaltyAom" />
	<meta property="og:site_name" content="SaltyAom's meme gallery" />

	<meta property="og:image" content="https://saltyaom.com/og.png" />
	<meta property="og:image:width" content="1920" />
	<meta property="og:image:height" content="1080" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:type" content="website" />

	<link
		rel="icon"
		href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎨</text></svg>"
	/>
</svelte:head>

<Search {init} on:search={handleSearch} />
{#if result.length}
	<ul id="g">
		{#each result as src}
			<Image {src} />
		{/each}
	</ul>
{:else}
	{@const meme = randomMeme()}
	<main id="n">
		<a class="a" href="/meme/{meme}" download={meme}>
			<img class="i" src="/meme/{encodeURI(meme)}" alt={meme} />
		</a>
		<h1 class="h">Not Found</h1>
	</main>
{/if}

<style>
	#g {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
		gap: 4px;
		margin: 0;
		padding: 0;
	}

	@media (min-width: 768px) {
		#g {
			grid-template-columns: repeat(auto-fill, minmax(205px, 1fr));
		}
	}

	@media (min-width: 1366px) {
		#g {
			grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));
		}
	}

	#n {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: calc(100vh - 5em);
		padding-bottom: 5em;
	}

	#n > .a > .i {
		width: 16em;
		border-radius: 0.75em;
	}

	#n > .h {
		font-size: 1.75em;
		font-weight: 400;
		color: var(--text);
	}
</style>
