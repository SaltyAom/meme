<script lang="ts">
	export let src: string
</script>

<a href="/meme/{src}" download={src}>
	<figure class="f">
		<figcaption class="l">
			<span>{src}</span>
		</figcaption>
		<img class="i" src="/meme/{encodeURI(src)}" alt={src} loading="lazy" />
	</figure>
</a>

<style>
	.f {
		position: relative;
		width: 100%;
		aspect-ratio: 1;
		margin: 0;
		overflow: hidden;
	}

	.f > .l {
		position: absolute;
		display: flex;
		align-items: flex-end;
		background-color: rgba(0, 0, 0, .5);
		width: 100%;
		height: 100%;
		color: #fff;
		font-size: 1.25em;
		font-weight: 500;
		margin: 0;
		padding: 0.5em;
		opacity: 0;
		transition: opacity 0.1s ease-out;
	}

	.f:hover > .l,
	.f:focus > .l {
		opacity: 1;
	}

	.f > .i {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
