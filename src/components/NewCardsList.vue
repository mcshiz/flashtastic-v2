<template>
	<div>
		<editCardModal :card="card" :index="editIndex" :save="save"></editCardModal>
		<ul class="list-group">
			<li v-for='(newCard, index) in cards' :key='`question-${index}`' class="list-group-item">
				<div class="row text-left">
					<div class="col-12 col-sm-5 align-self-center">
						<b class="new-question-label">Question:</b>
						<span v-if="newCard.questionType === 'image'" >
							<br>
							<img :src="newCard.question" alt="" height="200" width="200">
						</span>
						<span v-else>{{newCard.question}}</span>
					</div>
					<div class="col-12 col-sm-5 align-self-center">
						<b class="new-question-label">Answer:</b>
						<span v-if="newCard.answerType === 'image'">
							<br>
							<img :src="newCard.answer" alt="" height="200" width="200">
						</span>
						<span v-else>{{newCard.answer}}</span>
					</div>
					<div class="col-auto col-md-1 pull-right align-self-center">
						<button class="btn ripple btn-primary" v-on:click="editCard(newCard, index)">Edit</button>
					</div>
					<div class="col-auto col-md-1 pull-right align-self-center">
						<button class="btn ripple btn-danger" v-on:click="deleteCard(index)">Delete</button>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import EditCardModal from './EditCardModal'
import $ from 'jquery'
export default {
	name: 'newCardList',
	props: ['cards', 'deleteCard', 'save'],
	data() {
		return {
			card: {},
			editIndex: null
		}
	},
	computed: {
		...mapState(['newQuestions'])
	},
	components: {
		'editCardModal': EditCardModal
	},
	methods: {
		editCard: function(card, index) {
			this.card = card
			this.editIndex = index
			$('#editModal').modal()
		}
	}
}
</script>
