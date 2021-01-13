<script lang="ts">
	import Document from "./Document.svelte" 
	import Labeller from "./Labeller.svelte" 
</script>

<main>
	<Document />
	<Labeller />
</main>

<style>

	:root {
		--single-column-text-max: 850px;
		--labeller-width: 300px;
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: var(--single-column-text-max) var(--labeller-width);
		display: grid;
		grid-gap: 12px;
		width: 100vw;
		justify-content: center;
		/* Stops the download bar (desktop) and the auto-hiding address bar (mobile) affecting the layout */
		height: -webkit-fill-available;
	}


	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>