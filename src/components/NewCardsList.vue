<template>
	<div class="col">
		<editCardModal :card="card" :cardKey="key" :save="saveEdits" :uploadImage="upload"></editCardModal>
		<ul class="list-group">
			<li v-for='(card, key) in cards' :key='`question-${key}`' class="list-group-item">
				<div class="row text-left" v-if="card">
					<div class="col-12 col-sm-5 col-md-4 align-self-center">
						<b class="new-question-label">Question:</b>
						<span v-if="card.questionType === 'image'" >
							<br>
							<img :src="card.question" alt="" height="200" width="200">
						</span>
						<span v-else>{{card.question}}</span>
					</div>
					<div class="col-12 col-sm-5 col-md-4 align-self-center">
						<b class="new-question-label">Answer:</b>
						<span v-if="card.answerType === 'image'">
							<br>
							<img :src="card.answer" alt="" height="200" width="200">
						</span>
						<span v-else>{{card.answer}}</span>
					</div>
					<div class="col-auto col-sm-1 col-md-2 mt-2 text-right align-self-center">
						<button class="btn ripple btn-primary" v-on:click="editCard(card, key)">Edit</button>
					</div>
					<div class="col-auto col-sm-1  col-md-2 mt-2 pull-right align-self-center">
						<button class="btn ripple btn-danger" v-on:click="deleteCard(key)">Delete</button>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
import EditCardModal from './EditCardModal'
import $ from 'jquery'
export default {
	name: 'newCardList',
	props: ['cards', 'save', 'delete', 'upload'],
	data() {
		return {
			card: {},
			key: null
		}
	},
	components: {
		'editCardModal': EditCardModal
	},
	methods: {
		editCard: function(card, key) {
			this.card = card
			this.key = key
			$('#editModal').modal()
		},
		deleteCard: function(index) {
			if(window.confirm('Are you sure you want to delete this question?')) {

				this.delete(index)
			}
		},
		saveEdits: function(card, key) {
			this.save(card, key)
			$('#editModal').modal('hide')
		}
	}
}
</script>
