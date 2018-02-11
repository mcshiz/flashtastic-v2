<template>
	<div class="row mb-4">
		<div class="col-9">
			<div class="deck-title"  data-toggle="modal" data-target="#deckModal">
				{{name}}
			</div>
		</div>
		<div class="col-3 align-self-end text-left">
			<button class="btn ripple btn-sm btn-light deck-title-edit-button" data-toggle="modal" data-target="#deckModal">
				<i class="fa fa-pencil" aria-hidden="true"></i>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'deck-name',
	props: ['name']
}
</script>

<style scoped>
	.deck-title {
		vertical-align: middle;
		font-size: 2.25em;
		line-height: 1em;
		height: 1em;
		border-bottom: 1px solid lightgray;
		cursor: pointer;
	}
	.deck-title-edit-button {
		background-color: lightgray;
	}
	.deck-title-container:hover .deck-title-edit-button {
		background-color: darkgray;
	}
</style>
