<template>
	<div class="new-question-container mt-4 row">
		<div class="col-12">
			<h4 class="text-left">Add a new question</h4>
		</div>
		<div class="col-12 col-md-5 text-center mb-4">
			<new-question-answer-fields :field="'question'" :card="blankCard" @update-card="updateNewCard"></new-question-answer-fields>
		</div>
		<div class="col-12 col-md-5 text-center mb-4">
			<new-question-answer-fields :field="'answer'" :card="blankCard" @update-card="updateNewCard"></new-question-answer-fields>
		</div>
		<div class="col-12 col-md-2 mb-4">
			<button class="btn ripple btn-success" v-on:click="addCard">Add</button>
			<button class="btn ripple btn-secondary" v-on:click="clearCard">Clear</button>
		</div>
	</div>
</template>

<script>
import NewQuestionAnswerFields from './NewQuestionAnswerFields'
import { mapState } from 'vuex'
export default {
	name: 'add-new-card',
	components: {
		NewQuestionAnswerFields
	},
	computed: {
		...mapState(['blankCard'])
	},
	methods: {
		clearCard: function() {
			this.$store.dispatch('CREATE_BLANK_CARD')
		},
		addCard: function() {
			this.$store.dispatch('ADD_CARD_TO_WORKING_DECK')
		},
		updateNewCard: function(obj) {
			this.$store.commit('UPDATE_CARD', {field: obj.field, value: obj.value})
		}
	}
}
</script>

<style scoped>

</style>
