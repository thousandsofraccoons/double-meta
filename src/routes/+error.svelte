<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>

<div class="container pt-8">
	<h1 class="text-xl">{$page.status}</h1>
	<p>
		{$page.error.message}
	</p>
</div>
