<template>
	<div class="row mb-4">
		<div class="col-9">
			<div class="deck-title h-100"  data-toggle="modal" data-target="#deckModal">
				{{deck.name}}
			</div>
		</div>
		<div class="col-3 align-self-end">
			<button class="btn ripple btn-light deck-title-edit-button" data-toggle="modal" data-target="#deckModal">
				<i class="fa fa-pencil" aria-hidden="true"></i>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'deck-name',
	props: ['deck']
}
</script>

<style scoped>

</style>
