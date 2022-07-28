<script lang="ts">
	import { browser } from '$app/env'
	import { page } from '$app/stores'

	import { createEventDispatcher, onMount } from 'svelte'
	import Fuse from 'fuse.js'

	export let init: string[]
	let search = ''

	const dispatch = createEventDispatcher()

	$: engine = new Fuse(init)

	$: {
		if (search)
			dispatch(
				'search',
				engine.search(search).map(({ item }) => item)
			)
		else dispatch('search', init)
	}
</script>

<form id="s">
	<div class="d">
		<svg
			class="s"
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
		>
			<path
				d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"
			/>
		</svg>
		<input
			class="i"
			type="search"
			placeholder="Find some meme"
			bind:value={search}
		/>
	</div>
</form>

<style>
	#s {
		position: sticky;
		top: 0;
		z-index: 1;
		width: 100%;
		padding: 0.75em;
		background: var(--bg);
	}

	#s > .d {
		display: flex;
		flex-direction: row;
		width: 100%;
		padding: 0.25em 0.75em;
		border-radius: 999px;
		background-color: var(--accent);
	}

	#s > .d > .s {
		transform: scale(0.5875);
	}

	#s > .d > .i {
		display: inline-flex;
		flex: 1;
		appearance: none;
		color: var(--text);
		font-size: 1.375em;
		font-weight: 500;
		background-color: transparent;
		border: 0;
		outline: none;
	}
</style>
