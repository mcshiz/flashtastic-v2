<template>
	<div class="modal fade" id="editModal" tabindex="-1" role="dialog"  aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Edit</h5>
				</div>
				<div class="modal-body text-left">
					<div class="col-12 text-center mb-4">
						<new-question-answer-fields :field="'question'" :card="editingCard" @update-card="updateExistingCard"></new-question-answer-fields>
						<br>
						<new-question-answer-fields :field="'answer'" :card="editingCard" @update-card="updateExistingCard"></new-question-answer-fields>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn ripple btn-secondary cancel" data-dismiss="modal" aria-label="Close">Cancel</button>
					<button type="button" class="btn ripple btn-primary save" v-on:click="save(editingCard, cardKey)">Save changes</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import NewQuestionAnswerFields from './NewQuestionAnswerFields'
export default {
	name: 'EditCardModal',
	props: ['card', 'cardKey', 'save'],
	data() {
		return{
			questionImageLoading: false,
			answerImageLoading: false
		}
	},
	computed: {
		// make a copy of the card we are editing so we are not mutating, and can easily cancel edits
		editingCard: function() {
			return Object.assign({}, this.card)
		}
	},
	components: {
		NewQuestionAnswerFields
	},
	methods: {
		updateExistingCard: function(obj) {
			this.editingCard[obj.field] = obj.value
		}
	}
}
</script>
