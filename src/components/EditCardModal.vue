<template>
	<div class="modal fade" id="editModal" tabindex="-1" role="dialog"  aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Edit</h5>
				</div>
				<div class="modal-body text-left">
					<div class="form-group">
						<label for="editQuestion">Question:</label>
						<input type="text" id="editQuestion" class="form-control" placeholder="Question" aria-label="Deck Name" v-model="editingCard.question">
					</div>
					<div class="form-group">
						<label for="editAnswer">Answer:</label>
						<input type="text" id="editAnswer" class="form-control" placeholder="Answer" aria-label="Deck Name" v-model="editingCard.answer">
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn ripple btn-secondary" data-dismiss="modal" aria-label="Close">Cancel</button>
					<button type="button" class="btn ripple btn-primary" v-on:click="save({index: index, card: editingCard})">Save changes</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'EditCardModal',
	props: ['card', 'index', 'save'],
	computed: {
		// make a copy of the card we are editing so we are not mutating, and can easily cancel edits
		editingCard: function() {
			return Object.assign({}, this.card)
		}
	}
}
</script>
